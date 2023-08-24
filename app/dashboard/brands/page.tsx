import React from "react";
import Link from "next/link";

// Components
import BrandsTable from "@/components/dashboard/BrandsTable";
import { buttonVariants } from "@/components/ui/Button";

// Routes and Libs
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

const Brands = () => {
  return (
    <section className="flex flex-col gap-2">
      <Link
        href={ROUTES.CREATE_BRAND}
        className={cn(buttonVariants({ variant: "outline" }), "ml-auto w-fit")}
      >
        Create a new one
      </Link>
      <BrandsTable />
    </section>
  );
};

export default Brands;
