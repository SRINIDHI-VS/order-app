import AvatarCell from "../components/AvatarCell";
import { toNumber } from "../utils/helpers";
import IconButton from "../components/IconButton";
import { Pencil, Trash2 } from "lucide-react";

export const getOrderColumns = (onSelectEdit, handleDelete) => [
  {
    headerName: "",
    checkboxSelection: true,
    headerCheckboxSelection: true,
    width: 40,
    minWidth: 35, // forces smaller size
    maxWidth: 45,
    pinned: "left",
    filter: false,
  },
  {
    headerName: "Basic Details",
    marryChildren: true,
    children: [
      { field: "id", headerName: "ID", width: 100 },
      { field: "name", headerName: "Customer Name", width: 220 },
      { field: "client", headerName: "Client", width: 160 },
      { field: "uniqueid", headerName: "Unique ID", width: 140 },

      {
        field: "createdAt",
        headerName: "Created At",
        width: 160,
        filter: "agDateColumnFilter",
        valueFormatter: ({ value }) =>
          value ? new Date(value).toLocaleString() : "",
      },
    ],
  },

  {
    headerName: "Product Details",
    marryChildren: true,
    children: [
      { field: "product", headerName: "Product", width: 150 },
      { field: "color", headerName: "Color", width: 120 },
      { field: "company", headerName: "Company", width: 200 },
      { field: "showroom", headerName: "Showroom", width: 160 },
      { field: "country", headerName: "Country", width: 140 },

      {
        field: "loadingDate",
        headerName: "Loading Date",
        width: 150,
        filter: "agDateColumnFilter",
        valueFormatter: ({ value }) =>
          value ? new Date(value).toLocaleDateString() : "",
      },

      {
        field: "avatar",
        headerName: "Avatar",
        width: 120,
        cellRenderer: AvatarCell,
        filter: false,
      },
    ],
  },

  {
    headerName: "Pricing",
    marryChildren: true,
    children: [
      {
        field: "price1",
        headerName: "Price 1",
        width: 130,
        filter: "agNumberColumnFilter",
        valueFormatter: ({ value }) =>
          value ? `$${Number(value).toFixed(2)}` : "$0.00",
      },
      {
        field: "price2",
        headerName: "Price 2",
        width: 130,
        filter: "agNumberColumnFilter",
        valueFormatter: ({ value }) =>
          value ? `$${Number(value).toFixed(2)}` : "$0.00",
      },
      { field: "total", headerName: "Total (API)", width: 120 },

      {
        field: "totalPrice",
        headerName: "Total (Calculated)",
        width: 160,
        valueGetter: ({ data }) =>
          toNumber(data?.price1) + toNumber(data?.price2),
        valueFormatter: ({ value }) => `$${Number(value).toFixed(2)}`,
        cellClass: "font-semibold text-green-700",
      },
    ],
  },

  {
    headerName: "Actions",
    pinned: "right",
    width: 100,
    filter: false,
    cellRenderer: (params) => (
      <div
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          icon={Pencil}
          className="text-blue-600 hover:text-blue-800"
          onClick={() => onSelectEdit(params.data)}
        />

        <IconButton
          icon={Trash2}
          className="text-red-600 hover:text-red-800"
          onClick={() => handleDelete(params.data.id)}
        />
      </div>
    ),
  },
];
