"use client";

import { cn } from "@/lib/utils";
import { CategoryFormPayload } from "@/lib/validators/categoryForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { FC, ReactNode, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/Button";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  children?: ReactNode;
};

const FormGroup: FC<Props> = ({ children }) => {
  return <div className="w-full flex flex-col gap-2">{children}</div>;
};

const CategoryForm: FC<{ className?: string }> = ({ className }) => {
  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  const [name, setName] = useState<string>("");

  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CategoryFormPayload = {
        name,
      };

      console.log(payload);

      try {
        const { data } = await axios.post("/api/category", payload);

        console.log("Data", data);

        return data;
      } catch (err) {
        console.log("Error while sending axios request", err);
      }
    },
  });

  const handleSubmit = () => {
    if (isEditMode) {
      console.log("Edit mode submission");
    } else {
      createCategory();
    }
  };

  return (
    <div className={cn(className, "w-full flex flex-col gap-4")}>
      <FormGroup>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>

      <Button disabled={isLoading} onClick={handleSubmit} className="w-fit">
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {isEditMode ? "Update the category" : "Add new category"}
      </Button>
    </div>
  );
};

export default CategoryForm;
