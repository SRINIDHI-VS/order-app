import { useState, useCallback, useEffect } from "react";
import OrderGrid from "./components/OrderGrid";
import OrderForm from "./components/OrderForm";
import { fetchOrders } from "./api/orderApi";

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  const loadOrders = useCallback(async () => {
    const data = await fetchOrders();
    setOrders(data);
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return (
    <div className="min-h-screen bg-indigo-50  p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
        Order Management
      </h1>

      <div className="max-w-5xl mx-auto bg-indigo-100  shadow-lg rounded-xl p-6 space-y-8">
        <OrderForm
          selectedOrder={selectedOrder}
          refreshGrid={loadOrders}
          clearSelection={() => setSelectedOrder(null)}
        />
        <OrderGrid
          orders={orders}
          onSelectEdit={(order) => setSelectedOrder(order)}
          refreshGrid={loadOrders}
        />
      </div>
    </div>
  );
}
