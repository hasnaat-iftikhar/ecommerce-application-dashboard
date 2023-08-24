"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// Libs
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { BrandFormPayload } from "@/lib/validators/brandForm";
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

const BrandForm: FC<{ className?: string }> = ({ className }) => {
  const queryClient = useQueryClient();

  const { toast } = useToast();
  const router = useRouter();

  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  const [name, setName] = useState<string>("");

  const {
    isLoading: isBrandLoading,
    error,
    data,
    refetch,
  } = useQuery({
    queryKey: ["fetchingBrandByID", slug],
    queryFn: () => fetch(`/api/brand?id=${slug}`).then((res) => res.json()),
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
      description: "We are facing problem while fetching brand detail.",
    });
  }

  const { mutate: createBrand, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: BrandFormPayload = {
        name,
      };

      try {
        const { data } = await axios.post("/api/brand", payload);

        if (data?.success === true) {
          setName("");

          toast({
            variant: "default",
            title: "Success!",
            description: data?.message,
          });
        }

        await queryClient.refetchQueries(["fetchingBrands"]);

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

  const { mutate: updateBrand, isLoading: updateBrandLoading } = useMutation({
    mutationFn: async () => {
      const payload: BrandFormPayload = {
        name,
      };

      try {
        const { data } = await axios.put(`/api/brand?id=${slug}`, payload);

        if (data?.success === true) {
          setName("");

          toast({
            variant: "default",
            title: "Success!",
            description: data?.message,
          });
        }

        await queryClient.refetchQueries(["fetchingBrands"]);

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
      updateBrand();
    } else {
      createBrand();
    }
  };

  return (
    <div className={cn(className, "w-full flex flex-col gap-4")}>
      <FormGroup>
        <Label>Name</Label>
        <Input
          disabled={isEditMode && isBrandLoading}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isEditMode && isBrandLoading ? "Please wait..." : ""}
        />
      </FormGroup>

      <Button
        disabled={updateBrandLoading || isLoading || name == ""}
        onClick={handleSubmit}
        className="w-fit"
      >
        {(isLoading || updateBrandLoading) && (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isEditMode ? "Update the brand" : "Add new brand"}
      </Button>
    </div>
  );
};

export default BrandForm;
