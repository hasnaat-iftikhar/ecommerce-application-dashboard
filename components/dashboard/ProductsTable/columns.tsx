"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

// Type
import ProductType from "@/lib/types/product";

// Components
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

// Routes
import ROUTES from "@/constants/routes";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "id",
    header: "Product ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "sales",
    header: "Sales",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      console.log(JSON.stringify(row, null, 2));
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
            <Link href={ROUTES.EDIT_PRODUCT(row.original.id)}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
