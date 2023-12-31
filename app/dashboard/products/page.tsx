import React from "react";
import Link from "next/link";

// Routes
import ROUTES from "@/constants/routes";

// Components
import ProductsTable from "@/components/dashboard/ProductsTable";
import { buttonVariants } from "@/components/ui/Button";

// Libs
import { cn } from "@/lib/utils";

const Products = () => {
  return (
    <section className="flex flex-col gap-2">
      <Link
        href={ROUTES.CREATE_PRODUCT}
        className={cn(buttonVariants({ variant: "outline" }), "ml-auto w-fit")}
      >
        Create a new one
      </Link>
      <ProductsTable />
    </section>
  );
};

export default Products;
