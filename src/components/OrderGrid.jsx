import { useMemo, useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { deleteOrder } from "../api/orderApi";
import { getOrderColumns } from "../config/orderColumns";
import ActionButton from "./GridButtons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function OrderGrid({ orders = [], onSelectEdit, refreshGrid }) {
  const gridRef = useRef(null);
  const [quickFilter, setQuickFilter] = useState("");

  const processed = useMemo(() => orders || [], [orders]);

  const handleDelete = useCallback(
    async (id) => {
      if (!window.confirm("Are you sure you want to delete this order?"))
        return;

      try {
        await deleteOrder(id);
        await refreshGrid();
      } catch (err) {
        alert(err.message || "Failed to delete order");
      }
    },
    [refreshGrid]
  );

  const columnDefs = useMemo(
    () => getOrderColumns(onSelectEdit, handleDelete),
    [onSelectEdit, handleDelete]
  );

  const onGridReady = (params) => {
    gridRef.current = params.api;
  };

  const exportCsv = () => {
    gridRef.current?.exportDataAsCsv({ fileName: "orders.csv" });
  };

  const deleteSelected = async () => {
    const rows = gridRef.current?.getSelectedRows();
    if (!rows.length) return alert("Select rows to delete.");

    if (!window.confirm(`Delete ${rows.length} selected records?`)) return;

    await Promise.all(rows.map((r) => deleteOrder(r.id)));
    await refreshGrid();
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 overflow-x-auto">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
          <p className="text-gray-600 text-sm mt-1">
            {processed.length} total records
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            value={quickFilter}
            onChange={(e) => setQuickFilter(e.target.value)}
            placeholder="Quick search"
            className="px-3 py-2 border rounded w-full sm:w-auto"
            style={{ minWidth: 200 }}
          />
          <ActionButton
            label="Add Order"
            className="bg-blue-500"
            onClick={() => onSelectEdit({ isNew: true })}
          />

          <ActionButton
            label="Export CSV"
            className="bg-emerald-600"
            onClick={exportCsv}
          />

          <ActionButton
            label="Delete Selected"
            className="bg-red-600"
            onClick={deleteSelected}
          />
        </div>
      </header>

      <div className="ag-theme-alpine" style={{ height: 600 }}>
        <AgGridReact
          onGridReady={onGridReady}
          rowData={processed}
          columnDefs={columnDefs}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={20}
          animateRows={true}
          headerHeight={52}
          rowHeight={45}
          quickFilterText={quickFilter}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
            minWidth: 120,
            cellClass: "flex items-center",
          }}
        />
      </div>
    </div>
  );
}
