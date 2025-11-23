import { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { deleteOrder } from "../api/orderApi";
import { getOrderColumns } from "../config/orderColumns";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function OrderGrid({ orders, onSelectEdit, refreshGrid }) {
  
  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Are you sure you want to delete this order?"))
        return;

      await deleteOrder(id);
      await refreshGrid();
    },
    [refreshGrid]
  );

  const columns = useMemo(
    () => getOrderColumns(onSelectEdit, handleDelete),
    [onSelectEdit, handleDelete]
  );

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        <p className="text-gray-600 text-sm mt-1">
          {orders ? `${orders.length} total records` : "Loading..."}
        </p>
      </header>

      <div className="ag-theme-alpine w-full" style={{ height: 550 }}>
        <AgGridReact
          rowData={orders}
          columnDefs={columns}
          animateRows={true}
          rowHeight={60}
          headerHeight={50}
          pagination={true}
          paginationPageSize={10}
          ensureDomOrder={true}
        />
      </div>
    </div>
  );
}
