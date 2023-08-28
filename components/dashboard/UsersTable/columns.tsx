import UserType from "@/lib/types/user";
import { formatISODate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<UserType>[] = [
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
