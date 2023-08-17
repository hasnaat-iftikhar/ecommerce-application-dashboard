import React from "react";
import Link from "next/link";

// Components
import CategoriesTable from "@/components/dashboard/CategoriesTable";
import { buttonVariants } from "@/components/ui/Button";

// Routes and Libs
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

const Categories = () => {
  return (
    <section className="flex flex-col gap-2">
      <Link
        href={ROUTES.CREATE_CATEGORY}
        className={cn(buttonVariants({ variant: "outline" }), "ml-auto w-fit")}
      >
        Create a new one
      </Link>
      <CategoriesTable />
    </section>
  );
};

export default Categories;
