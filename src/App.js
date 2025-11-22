import { useState } from "react";
import OrderGrid from "./components/OrderGrid";
import OrderForm from "./components/OrderForm";
import { fetchOrders } from "./api/orderApi";

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const refreshGrid = async () => {
    await fetchOrders();
    window.location.reload();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-10">Order Management</h1>

      <OrderForm
        selectedOrder={selectedOrder}
        refreshGrid={refreshGrid}
        clearSelection={() => setSelectedOrder(null)}
      />

      <OrderGrid onSelectEdit={(order) => setSelectedOrder(order)} />
    </div>
  );
}
