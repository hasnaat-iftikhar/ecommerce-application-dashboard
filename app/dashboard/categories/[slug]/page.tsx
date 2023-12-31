"use client";

import React from "react";
import { useParams } from "next/navigation";

// Components
import BackButton from "@/components/BackButton";
import CategoryForm from "@/components/forms/CategoryForm";

const Categories = () => {
  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  return (
    <div>
      <BackButton />
      <div className="border-t pt-4 mt-3">
        <h1 className="text-[22px] font-medium">
          {isEditMode ? "Edit your category" : "Create new category"}
        </h1>
        <p className="text-[14px]">
          {isEditMode
            ? "Awosome! Let's edit your existing category."
            : "Awosome! Let's add a new item in your category list."}
        </p>
        <CategoryForm className="mt-4" />
      </div>
    </div>
  );
};

export default Categories;
