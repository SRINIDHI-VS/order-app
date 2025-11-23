import { useState, useCallback, useEffect } from "react";
import { fetchOrders } from "../api/orderApi";

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load orders");
      console.error("loadOrders error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return {
    orders,
    selectedOrder,
    setSelectedOrder,
    refresh: loadOrders,
    loading,
    error,
  };
}

export default useOrders;
