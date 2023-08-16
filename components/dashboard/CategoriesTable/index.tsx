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
      id: "1",
      no: 1,
      name: "Adidas Ultra boost",
      attachedProducts: 12,
    },
  ];
}

const CategoriesTable: FC<Props> = async ({ className }) => {
  const data = await getData();

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CategoriesTable;
