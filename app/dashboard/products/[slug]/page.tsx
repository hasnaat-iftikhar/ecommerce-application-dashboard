import React from "react";
import CreateProductForm from "@/components/forms/CreateProductForm";
import BackButton from "@/components/BackButton";

const Page = () => {
  return (
    <div>
      <BackButton />
      <div className="border-t pt-4 mt-3">
        <h1 className="text-[22px] font-medium">Create new product</h1>
        <p className="text-[14px]">
          Awosome! Let&apos;s add a new item in your product list.
        </p>
        <CreateProductForm className="mt-4" />
      </div>
    </div>
  );
};

export default Page;
