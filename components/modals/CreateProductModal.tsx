import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import CreateProductForm from "../forms/CreateProductForm";

const CreateProductModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-fit ml-auto">
        <span
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "bg-[#2F2F31] hover:bg-[#2F2F31] text-white"
          )}
        >
          Create a new one
        </span>
      </DialogTrigger>

      <DialogContent className="max-h-[400px] overflow-y-scroll vertical-scroll">
        <DialogHeader>
          <DialogTitle>Create new product</DialogTitle>
          <DialogDescription>
            Awosome! Let&apos;s add a new item in your product list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <CreateProductForm />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductModal;
