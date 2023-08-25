import React from "react";
import Link from "next/link";

// Components
import TagsTable from "@/components/dashboard/TagsTable";
import { buttonVariants } from "@/components/ui/Button";

// Routes and Libs
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

const Tags = () => {
  return (
    <section className="flex flex-col gap-2">
      <Link
        href={ROUTES.CREATE_TAG}
        className={cn(buttonVariants({ variant: "outline" }), "ml-auto w-fit")}
      >
        Create a new one
      </Link>
      <TagsTable />
    </section>
  );
};

export default Tags;
