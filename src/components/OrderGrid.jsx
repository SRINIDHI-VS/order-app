import { useMemo, useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { deleteOrder } from "../api/orderApi";
import { getOrderColumns } from "../config/orderColumns";
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
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
          <p className="text-gray-600 text-sm mt-1">
            {processed.length} total records
          </p>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={quickFilter}
            onChange={(e) => setQuickFilter(e.target.value)}
            placeholder="Quick search..."
            className="px-3 py-2 border rounded"
            style={{ minWidth: 200 }}
          />

          <button
            onClick={exportCsv}
            className="px-3 py-2 rounded text-white"
            style={{ background: "#059669" }}
          >
            Export CSV
          </button>

          <button
            onClick={deleteSelected}
            className="px-3 py-2 rounded text-white"
            style={{ background: "#ef4444" }}
          >
            Delete Selected
          </button>
        </div>
      </header>

      <div className="ag-theme-alpine" style={{ height: 600 }}>
        <AgGridReact
          onGridReady={onGridReady}
          rowData={processed}
          columnDefs={columnDefs}
          rowSelection="multiple"
          suppressRowClickSelection={false}
          pagination={true}
          paginationPageSize={10}
          animateRows={true}
          headerHeight={52}
          rowHeight={40}
          quickFilterText={quickFilter}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
            resizable: true,
            minWidth: 120,
          }}
          sideBar={{
            toolPanels: ["columns", "filters"],
          }}
          statusBar={{
            statusPanels: [
              {
                statusPanel: "agTotalAndFilteredRowCountComponent",
                align: "left",
              },
              { statusPanel: "agAggregationComponent", align: "right" },
            ],
          }}
        />
      </div>
    </div>
  );
}
