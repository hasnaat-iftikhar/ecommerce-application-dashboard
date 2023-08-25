"use client";

import React from "react";
import { useParams } from "next/navigation";

// Components
import BackButton from "@/components/BackButton";
import TagForm from "@/components/forms/TagForm";

const Tags = () => {
  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  return (
    <div>
      <BackButton />
      <div className="border-t pt-4 mt-3">
        <h1 className="text-[22px] font-medium">
          {isEditMode ? "Edit your tag" : "Create new tag"}
        </h1>
        <p className="text-[14px]">
          {isEditMode
            ? "Awosome! Let's edit your existing tag."
            : "Awosome! Let's add a new item in your tag list."}
        </p>
        <TagForm className="mt-4" />
      </div>
    </div>
  );
};

export default Tags;
