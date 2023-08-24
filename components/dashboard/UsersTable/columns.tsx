import { formatISODate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  no: number;
  name: string;
  email: string;
  createdAt: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => {
      return `#${row?.index + 1}`;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = formatISODate(row.original.createdAt);

      return date;
    },
  },
];
