import Header from "./components/Header";
import Footer from "./components/Footer";
import OrderGrid from "./components/OrderGrid";
import OrderForm from "./components/OrderForm";
import useOrders from "./hooks/useOrders";
import Modal from "./components/Modal";

export default function App() {
  const { orders, selectedOrder, setSelectedOrder, refresh, error, loading } =
    useOrders();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="w-full max-w-full sm:max-w-7xl mx-auto bg-blue-100 shadow-lg rounded-xl p-4 sm:p-6 mt-3 space-y-8 overflow-x-auto">
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
      </main>
      <Footer />
    </div>
  );
}
