import { cn } from "@/lib/utils";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { FC } from "react";

type Props = {
  className?: string;
};

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      name: "Adidas Ultra boost",
      category: "Sneaker",
      price: 110,
      sales: 1269,
    },
  ];
}

const ProductsTable: FC<Props> = async ({ className }) => {
  const data = await getData();

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ProductsTable;
