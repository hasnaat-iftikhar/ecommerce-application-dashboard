"use client";

import { FC } from "react";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cn } from "@/lib/utils";
import { prisma } from "@/lib/db";
import axios from "axios";

type Props = {
  className?: string;
};

const CategoriesTable: FC<Props> = ({ className }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchingCategories"],
    queryFn: () => fetch("/api/category").then((res) => res.json()),
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.log("Error while fetching categories", error);
    return <p>There is an problem while fetching categories</p>;
  }

  if (data) {
    console.log("data", data);
  }

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default CategoriesTable;
