"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { MoreHorizontal } from "lucide-react";

export type Payment = {
  id: string;
  no: number;
  name: string;
  products: string[];
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
    accessorKey: "attached-products",
    header: "Attached products",
    cell: ({ row }) => {
      const totalProducts = row.original?.products?.length;
      return totalProducts;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={ROUTES.EDIT_CATEGORY(row.original.id)}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
