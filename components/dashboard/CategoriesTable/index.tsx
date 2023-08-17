"use client";

import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";

type Props = {
  className?: string;
};

// async function getData(): Promise<Payment[]> {
//   return [
//     {
//       id: "1",
//       no: 1,
//       name: "Adidas Ultra boost",
//       attachedProducts: 12,
//     },
//   ];
// }

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

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default CategoriesTable;
