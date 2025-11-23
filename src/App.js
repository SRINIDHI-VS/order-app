import OrderGrid from "./components/OrderGrid";
import OrderForm from "./components/OrderForm";
import useOrders from "./hooks/useOrders";
import Modal from "./components/Modal";

export default function App() {
  const { orders, selectedOrder, setSelectedOrder, refresh, error, loading } =
    useOrders();

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
        Order Management
      </h1>

      <div className="max-w-8xl mx-auto bg-blue-100 shadow-lg rounded-xl p-6 space-y-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <OrderGrid
            orders={orders}
            onSelectEdit={setSelectedOrder}
            refreshGrid={refresh}
          />
        )}

        {error && <p className="text-red-600 text-center">{error}</p>}
      </div>
      <Modal
        open={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
      >
        <OrderForm
          selectedOrder={selectedOrder}
          refreshGrid={refresh}
          clearSelection={() => setSelectedOrder(null)}
        />
      </Modal>
    </div>
  );
}
