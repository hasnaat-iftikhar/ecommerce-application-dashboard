"use client";

import { FC } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import Message from "@/components/Message";
import { AlertCircle, Loader } from "lucide-react";

type Props = {
  className?: string;
};

const ProductsTable: FC<Props> = ({ className }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchingProducts"],
    queryFn: () => fetch("/api/product").then((res) => res.json()),
  });

  if (isLoading)
    return (
      <Message
        Icon={<Loader />}
        title="Please wait..."
        description="We are in a call with the server to fetch products!"
      />
    );

  if (error) {
    return (
      <Message
        Icon={<AlertCircle />}
        title="Error :P"
        description="There is an issue while fetching products!"
      />
    );
  }

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default ProductsTable;
