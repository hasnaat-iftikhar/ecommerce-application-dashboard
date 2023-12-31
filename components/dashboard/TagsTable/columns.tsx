import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Loader, MoreHorizontal } from "lucide-react";
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
import { ColumnDef, Row } from "@tanstack/react-table";
import axios from "axios";
import TagType from "@/lib/types/tag";

export const TagActionsCell: React.FC<{ row: Row<TagType> }> = ({ row }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    async (id: string) => await axios.delete(`/api/tag?id=${id}`),
    {
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(["fetchingTags"]);

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
          description: "Unable to delete the tag",
        });
      },
    }
  );

  const handleDeleteTag = () => {
    deleteMutation.mutate(row.original.id);
  };

  return (
    <>
      {deleteMutation?.isLoading ? (
        <div className="w-[32px] h-[32px] flex justify-center items-center">
          <Loader width="18px" height="18px" />
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={ROUTES.EDIT_TAG(row.original.id)}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleDeleteTag}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export const columns: ColumnDef<TagType>[] = [
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
      return <TagActionsCell row={row} />;
    },
  },
];
