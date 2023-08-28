"use client";

import OrderType from "@/lib/types/order";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OrderType>[] = [
  {
    accessorKey: "id",
    header: "Product ID",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "customer",
    header: "Customer name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
