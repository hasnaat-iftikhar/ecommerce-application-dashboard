"use client";

import { Loader, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef, Row } from "@tanstack/react-table";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

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
import { useState } from "react";

export const AttachedCategoryCell: React.FC<{ row: Row<ProductType> }> = ({
  row,
}) => {
  const { isLoading, error, data } = useQuery(
    ["fetchingCategoryById", row.original.categoryId],
    {
      queryFn: async (context) => {
        const [, categoryId] = context.queryKey;
        try {
          const response = await fetch(`/api/category?id=${categoryId}`);
          const categoryData = await response.json();
          return categoryData;
        } catch (error) {
          throw new Error(`Error fetching category: ${error}`);
        }
      },
    }
  );

  if (isLoading) return <Loader width="16px" height="16px" />;

  if (error) return <p className="text-red font-bold">Error!</p>;

  if (data.data.name) return <p>{data.data.name}</p>;
};

export const AttachedBrandCell: React.FC<{ row: Row<ProductType> }> = ({
  row,
}) => {
  const { isLoading, error, data } = useQuery(
    ["fetchingBrandById", row.original.brandId],
    {
      queryFn: async (context) => {
        const [, brandId] = context.queryKey;
        try {
          const response = await fetch(`/api/brand?id=${brandId}`);
          const brandData = await response.json();
          return brandData;
        } catch (error) {
          throw new Error(`Error fetching brand: ${error}`);
        }
      },
    }
  );

  if (isLoading) return <Loader width="16px" height="16px" />;

  if (error) return <p className="text-red font-bold">Error!</p>;

  if (data.data.name) return <p>{data.data.name}</p>;
};

export const ProductActionsCell: React.FC<{ row: Row<ProductType> }> = ({
  row,
}) => {
  const queryClient = useQueryClient();

  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMutation = useMutation(
    async (id: string) => {
      setIsDeleting(true);
      const res = await axios.delete(`/api/product?id=${id}`);
      setIsDeleting(false);
      return res;
    },
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["fetchingProducts"]);

        toast({
          variant: "default",
          title: "Success!",
          description: data.data.message,
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Unable to delete the product",
        });
      },
    }
  );

  const handleDeleteProduct = () => {
    deleteMutation.mutate(row.original.id);
  };

  if (isDeleting)
    return (
      <div className="w-[32px] h-[32px] flex justify-center items-center">
        <Loader width="16px" height="16px" />
      </div>
    );

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
        <DropdownMenuItem onClick={handleDeleteProduct}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "id",
    header: "Product ID",
    cell: ({ row }) => {
      return `#${row?.index + 1}`;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return <AttachedCategoryCell row={row} />;
    },
  },
  {
    accessorKey: "brands",
    header: "Brand",
    cell: ({ row }) => {
      return <AttachedBrandCell row={row} />;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ProductActionsCell row={row} />;
    },
  },
];
