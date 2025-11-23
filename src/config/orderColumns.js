import { toNumber } from "../utils/helpers";
import ActionButton from "../components/GridButtons";

export const getOrderColumns = (onSelectEdit, handleDelete) => [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    headerClass: "flex items-center justify-center text-center",
    cellClass: "flex items-center justify-center",
  },
  {
    field: "name",
    headerName: "Customer Name",
    flex: 1,
    headerClass: "flex items-center justify-center text-center",
    cellClass: "flex items-center justify-center",
  },
  {
    field: "product",
    headerName: "Product",
    flex: 1,
    headerClass: "flex items-center justify-center text-center",
    cellClass: "flex items-center justify-center",
  },
  {
    field: "price1",
    headerName: "Price 1",
    valueGetter: (p) => toNumber(p.data.price1),
    valueFormatter: (p) => `$${p.value.toFixed(2)}`,
    width: 130,
    type: "numericColumn",
    headerClass: "flex items-center justify-center text-center",
    cellClass: "flex items-center justify-center",
  },
  {
    field: "price2",
    headerName: "Price 2",
    valueGetter: (p) => toNumber(p.data.price2),
    valueFormatter: (p) => `$${p.value.toFixed(2)}`,
    width: 130,
    type: "numericColumn",
    headerClass: "flex items-center justify-center text-center",
    cellClass: "flex items-center justify-center",
  },
  {
    field: "totalPrice",
    headerName: "Total",
    valueGetter: (p) => toNumber(p.data.price1) + toNumber(p.data.price2),
    valueFormatter: (p) => `$${p.value.toFixed(2)}`,
    width: 130,
    type: "numericColumn",
    headerClass: "flex items-center justify-center text-center",
    cellClass: "flex items-center justify-center font-bold text-green-600",
  },
  {
    headerName: "Actions",
    width: 200,
    headerClass: "flex items-center justify-center text-center",
    cellRenderer: (p) => (
      <div className="flex gap-4 items-center h-full justify-center">
        <ActionButton
          label="Edit"
          className="bg-indigo-500 hover:bg-indigo-600"
          onClick={() => onSelectEdit(p.data)}
        />
        <ActionButton
          label="Delete"
          className="bg-red-500 hover:bg-red-600"
          onClick={() => handleDelete(p.data.id)}
        />
      </div>
    ),
    cellStyle: { overflow: "visible" },
  },
];
