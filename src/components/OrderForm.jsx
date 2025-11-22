import React, { useState, useEffect } from "react";
import { createOrder, updateOrder } from "../api/orderApi";

export default function OrderForm({ selectedOrder, refreshGrid, clearSelection }) {
  const [form, setForm] = useState({ name: "", price1: "", price2: "" });

  useEffect(() => {
    if (selectedOrder) {
      setForm(selectedOrder);
    }
  }, [selectedOrder]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price1 || !form.price2) {
      alert("All fields required!");
      return;
    }

    if (selectedOrder) {
      await updateOrder(selectedOrder.id, form);
    } else {
      await createOrder(form);
    }

    setForm({ name: "", price1: "", price2: "" });
    clearSelection();
    refreshGrid();
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>{selectedOrder ? "Update Order" : "Create Order"}</h3>

      <input placeholder="Name" name="name" value={form.name} onChange={handleChange} /><br /><br />
      <input placeholder="Price 1" name="price1" value={form.price1} onChange={handleChange} /><br /><br />
      <input placeholder="Price 2" name="price2" value={form.price2} onChange={handleChange} /><br /><br />

      <button onClick={handleSubmit}>
        {selectedOrder ? "Update Order" : "Create Order"}
      </button>
    </div>
  );
}
