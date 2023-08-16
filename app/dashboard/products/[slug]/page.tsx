"use client";

import React from "react";
import { useParams } from "next/navigation";

// Components
import ProductForm from "@/components/forms/ProductForm";
import BackButton from "@/components/BackButton";

const Page = () => {
  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  return (
    <div>
      <BackButton />
      <div className="border-t pt-4 mt-3">
        <h1 className="text-[22px] font-medium">
          {isEditMode ? "Edit your product" : "Create new product"}
        </h1>
        <p className="text-[14px]">
          {isEditMode
            ? "Awosome! Let's edit your existing product."
            : "Awosome! Let's add a new item in your product list."}
        </p>
        <ProductForm className="mt-4" />
      </div>
    </div>
  );
};

export default Page;
