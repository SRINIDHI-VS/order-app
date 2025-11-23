import { useState, useEffect, useCallback } from "react";
import { createOrder, updateOrder } from "../api/orderApi";
import InputField from "./InputField";
import { validateOrder, toNumber } from "../utils/helpers";

const INITIAL_FORM_STATE = {
  name: "",
  avatar: "",
  client: "",
  uniqueid: "",
  product: "",
  color: "",
  company: "",
  showroom: "",
  country: "",
  price1: "",
  price2: "",
  loadingDate: "",
};

export default function OrderForm({
  selectedOrder,
  refreshGrid,
  clearSelection,
}) {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (selectedOrder?.id) {
      setForm({
        name: selectedOrder.name || "",
        avatar: selectedOrder.avatar || "",
        client: selectedOrder.client || "",
        uniqueid: selectedOrder.uniqueid || "",
        product: selectedOrder.product || "",
        color: selectedOrder.color || "",
        company: selectedOrder.company || "",
        showroom: selectedOrder.showroom || "",
        country: selectedOrder.country || "",
        price1: selectedOrder.price1 ?? "",
        price2: selectedOrder.price2 ?? "",
        loadingDate: selectedOrder.loadingDate
          ? selectedOrder.loadingDate.slice(0, 10)
          : "",
      });
    } else {
      setForm(INITIAL_FORM_STATE);
    }

    setError("");
    setSuccess("");
  }, [selectedOrder]);

  const getTotalPrice = useCallback(() => {
    return toNumber(form.price1) + toNumber(form.price2);
  }, [form.price1, form.price2]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (error) setError("");
      if (success) setSuccess("");
    },
    [error, success]
  );

  const handleSubmit = useCallback(async () => {
    const validationMessage = validateOrder(form);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        price1: toNumber(form.price1),
        price2: toNumber(form.price2),
      };

      if (selectedOrder?.id) {
        await updateOrder(selectedOrder.id, payload);
        setSuccess("Order updated successfully!");
      } else {
        await createOrder(payload);
        setSuccess("Order created successfully!");
      }

      setForm(INITIAL_FORM_STATE);
      clearSelection();
      await refreshGrid();

      setTimeout(() => setSuccess(""), 2000);
    } catch (err) {
      setError(err.message || "Failed to save order. Please try again.");
      console.error("Order submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, selectedOrder, clearSelection, refreshGrid]);

  const handleCancel = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
    clearSelection();
    setError("");
    setSuccess("");
  }, [clearSelection]);

  const fields = [
    { label: "Customer Name", name: "name" },
    { label: "Avatar URL", name: "avatar" },
    { label: "Client", name: "client" },
    { label: "Unique ID", name: "uniqueid" },
    { label: "Product", name: "product" },
    { label: "Color", name: "color" },
    { label: "Company", name: "company" },
    { label: "Showroom", name: "showroom" },
    { label: "Country", name: "country" },
    { label: "Price 1", name: "price1", type: "number" },
    { label: "Price 2", name: "price2", type: "number" },
    { label: "Loading Date", name: "loadingDate", type: "date" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {selectedOrder?.id ? "Update Order" : "Create New Order"}
        </h3>

        {selectedOrder?.id && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Editing ID: {selectedOrder.id}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {fields.map(({ label, name, type }) => (
          <InputField
            key={name}
            label={label}
            required
            name={name}
            type={type || "text"}
            value={form[name]}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder={type ? "0.00" : `Enter ${label.toLowerCase()}`}
            autoComplete="off"
          />
        ))}
      </div>

      {(form.price1 || form.price2) && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <span className="text-sm text-gray-600">Total Price: </span>
          <span className="text-lg font-bold text-green-700">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? selectedOrder?.id
              ? "Updating..."
              : "Creating..."
            : selectedOrder?.id
            ? "Update Order"
            : "Create Order"}
        </button>

        {selectedOrder?.id && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
