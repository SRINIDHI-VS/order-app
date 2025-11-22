import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { fetchOrders, deleteOrder } from "../api/orderApi";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function OrderGrid({ onSelectEdit }) {
  const [orders, setOrders] = useState([]);

  const loadData = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    await deleteOrder(id);
    loadData();
  };

  // Convert ANY value to a number safely
  const toNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "client", headerName: "Client", width: 150 },
    { field: "product", headerName: "Product", width: 150 },

    // FIXED PRICE1 COLUMN
    {
      headerName: "Price 1",
      field: "price1",
      width: 120,
      valueGetter: (p) => toNumber(p.data.price1),
      valueFormatter: (p) => p.value.toFixed(2),
    },

    // FIXED PRICE2 COLUMN
    {
      headerName: "Price 2",
      field: "price2",
      width: 120,
      valueGetter: (p) => toNumber(p.data.price2),
      valueFormatter: (p) => p.value.toFixed(2),
    },

    // FIXED TOTAL PRICE
    {
      headerName: "Total Price",
      width: 150,
      valueGetter: (p) =>
        toNumber(p.data.price1) + toNumber(p.data.price2),
      valueFormatter: (p) => p.value.toFixed(2),
      cellStyle: { fontWeight: "bold", color: "green" },
    },

    {
      headerName: "Edit",
      width: 100,
      cellRenderer: (p) => (
        <button onClick={() => onSelectEdit(p.data)}>Edit</button>
      ),
    },
    {
      headerName: "Delete",
      width: 100,
      cellRenderer: (p) => (
        <button style={{ color: "red" }} onClick={() => handleDelete(p.data.id)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 500, width: "90%", margin: "auto" }}
    >
      <AgGridReact
        rowData={orders}
        columnDefs={columns}
        suppressReactErrorOverlay={true}
      />
    </div>
  );
}
