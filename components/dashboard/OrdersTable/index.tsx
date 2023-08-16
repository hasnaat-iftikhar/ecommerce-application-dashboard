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
      id: "#1",
      product: "Adidas Ultra boost",
      date: `8/15/2023`,
      customer: "John",
      status: "delivered",
      amount: 200,
    },
  ];
}

const OrdersTable: FC<Props> = async ({ className }) => {
  const data = await getData();

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default OrdersTable;
