"use client";

import { FC } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cn } from "@/lib/utils";
import ProductType from "@/lib/types/product";
import { useQuery } from "@tanstack/react-query";
import Message from "@/components/Message";
import { AlertCircle, Loader } from "lucide-react";

type Props = {
  className?: string;
};

// async function getData(): Promise<ProductType[]> {
//   return [
//     {
//       id: "728ed52f",
//       name: "Adidas Ultra boost",
//       category: "Sneaker",
//       price: 110,
//       sales: 1269,
//     },
//   ];
// }

const ProductsTable: FC<Props> = ({ className }) => {
  // const data = await getData();

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

  if (data) {
    console.log("[data] Products", data);
  }

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProductsTable;
