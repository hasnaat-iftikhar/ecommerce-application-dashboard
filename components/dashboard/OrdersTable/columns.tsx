"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  product: string;
  date: string;
  customer: string;
  status: "delivered" | "canceled" | "on way";
  amount: number;
};

export const columns: ColumnDef<Payment>[] = [
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
