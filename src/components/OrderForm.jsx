import { useState, useEffect, useCallback } from "react";
import { createOrder, updateOrder } from "../api/orderApi";

const INITIAL_FORM_STATE = {
  name: "",
  product: "",
  price1: "",
  price2: "",
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
    if (selectedOrder) {
      setForm({
        name: selectedOrder.name || "",
        product: selectedOrder.product || "",
        price1: selectedOrder.price1 || "",
        price2: selectedOrder.price2 || "",
      });
    } else {
      setForm(INITIAL_FORM_STATE);
    }
    setError("");
    setSuccess("");
  }, [selectedOrder]);

  const validateForm = useCallback(() => {
    if (!form.name.trim()) {
      setError("Customer name is required");
      return false;
    }
    if (!form.product.trim()) {
      setError("Product name is required");
      return false;
    }

    const price1 = parseFloat(form.price1);
    const price2 = parseFloat(form.price2);

    if (isNaN(price1) || price1 < 0) {
      setError("Price 1 must be a valid positive number");
      return false;
    }
    if (isNaN(price2) || price2 < 0) {
      setError("Price 2 must be a valid positive number");
      return false;
    }

    return true;
  }, [form]);

  const getTotalPrice = useCallback(() => {
    const p1 = parseFloat(form.price1) || 0;
    const p2 = parseFloat(form.price2) || 0;
    return p1 + p2;
  }, [form.price1, form.price2]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (error) setError("");
      if (success) setSuccess("");
    },
    [error, success]
  );

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        price1: parseFloat(form.price1),
        price2: parseFloat(form.price2),
      };

      if (selectedOrder) {
        await updateOrder(selectedOrder.id, payload);
        setSuccess("Order updated successfully!");
      } else {
        await createOrder(payload);
        setSuccess("Order created successfully!");
      }

      setForm(INITIAL_FORM_STATE);
      clearSelection();
      await refreshGrid();

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to save order. Please try again.");
      console.error("Order submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, selectedOrder, validateForm, clearSelection, refreshGrid]);

  const handleCancel = useCallback(() => {
    setForm(INITIAL_FORM_STATE);
    clearSelection();
    setError("");
    setSuccess("");
  }, [clearSelection]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {selectedOrder ? "Update Order" : "Create New Order"}
        </h3>
        {selectedOrder && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Editing ID: {selectedOrder.id}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Enter customer name"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={isSubmitting}
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="Enter product name"
            name="product"
            value={form.product}
            onChange={handleChange}
            disabled={isSubmitting}
            autoComplete="off"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price 1 <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="0.00"
            name="price1"
            type="number"
            step="0.01"
            min="0"
            value={form.price1}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price 2 <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="0.00"
            name="price2"
            type="number"
            step="0.01"
            min="0"
            value={form.price2}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
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
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm text-green-700">{success}</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>{selectedOrder ? "Updating..." : "Creating..."}</>
          ) : (
            <>{selectedOrder ? "Update Order" : "Create Order"}</>
          )}
        </button>

        {selectedOrder && (
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
