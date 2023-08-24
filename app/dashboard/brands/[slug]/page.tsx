"use client";

import React from "react";
import { useParams } from "next/navigation";

// Components
import BackButton from "@/components/BackButton";
import BrandForm from "@/components/forms/BrandForm";

const Brands = () => {
  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  return (
    <div>
      <BackButton />
      <div className="border-t pt-4 mt-3">
        <h1 className="text-[22px] font-medium">
          {isEditMode ? "Edit your brand" : "Create new brand"}
        </h1>
        <p className="text-[14px]">
          {isEditMode
            ? "Awosome! Let's edit your existing brand."
            : "Awosome! Let's add a new item in your brand list."}
        </p>
        <BrandForm className="mt-4" />
      </div>
    </div>
  );
};

export default Brands;
