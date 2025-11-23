import OrderGrid from "./components/OrderGrid";
import OrderForm from "./components/OrderForm";
import useOrders from "./hooks/useOrders";

export default function App() {
  const { orders, selectedOrder, setSelectedOrder, refresh, error, loading } =
    useOrders();

  return (
    <div className="min-h-screen bg-indigo-50 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
        Order Management
      </h1>

      <div className="max-w-5xl mx-auto bg-indigo-100 shadow-lg rounded-xl p-6 space-y-8">
        <OrderForm
          selectedOrder={selectedOrder}
          refreshGrid={refresh}
          clearSelection={() => setSelectedOrder(null)}
        />
        {loading ? (
          <p className="text-gray-600 text-center">Loading orders...</p>
        ) : (
          <OrderGrid
            orders={orders}
            onSelectEdit={setSelectedOrder}
            refreshGrid={refresh}
          />
        )}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
