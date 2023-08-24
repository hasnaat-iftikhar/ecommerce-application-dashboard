"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// Libs
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { CategoryFormPayload } from "@/lib/validators/categoryForm";
import { useToast } from "@/hooks/use-toast";

// Components
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
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const router = useRouter();

  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  const [name, setName] = useState<string>("");

  const {
    isLoading: isCategoryLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchingCategoryByID", slug],
    queryFn: () => fetch(`/api/category?id=${slug}`).then((res) => res.json()),
    enabled: isEditMode,
  });

  console.log("Iam fetching data", data);

  useEffect(() => {
    if (data) {
      setName(data.data.name);
    }
  }, [data]);

  if (error) {
    toast({
      variant: "destructive",
      title: "Error!",
      description: "We are facing problem while fetching category detail.",
    });
  }

  const { mutate: createCategory, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CategoryFormPayload = {
        name,
      };

      try {
        const { data } = await axios.post("/api/category", payload);

        if (data?.success === true) {
          setName("");

          toast({
            variant: "default",
            title: "Success!",
            description: data?.message,
          });
        }

        await queryClient.refetchQueries(["fetchingCategories"]);

        router.back();
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error?.response?.data?.error === true
        ) {
          toast({
            variant: "destructive",
            title: "Error!",
            description: error?.response?.data?.message,
          });
        } else {
          console.log("Error while sending Axios request", error);
        }
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
        <Input
          disabled={isEditMode && isCategoryLoading}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>

      <Button
        disabled={isLoading || name == ""}
        onClick={handleSubmit}
        className="w-fit"
      >
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {isEditMode ? "Update the category" : "Add new category"}
      </Button>
    </div>
  );
};

export default CategoryForm;
