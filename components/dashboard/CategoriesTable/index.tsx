"use client";

import { FC } from "react";
import Message from "@/components/Message";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cn } from "@/lib/utils";
import { AlertCircle, Loader } from "lucide-react";

type Props = {
  className?: string;
};

const CategoriesTable: FC<Props> = ({ className }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchingCategories"],
    queryFn: () => fetch("/api/category").then((res) => res.json()),
  });

  if (isLoading)
    return (
      <Message
        Icon={<Loader />}
        title="Please wait..."
        description="We are in a call with the server to fetch categories!"
      />
    );

  if (error) {
    return (
      <Message
        Icon={<AlertCircle />}
        title="Error :P"
        description="There is an issue while fetching categories!"
      />
    );
  }

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default CategoriesTable;
