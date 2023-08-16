"use client";

import React, { FC, ReactNode, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Components
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";

// Libs & Icons
import { cn } from "@/lib/utils";
import { ProductFormPayload } from "@/lib/validators/productForm";
import { ReloadIcon } from "@radix-ui/react-icons";

type Props = {
  children: ReactNode;
};

const FormGroup: FC<Props> = ({ children }) => {
  return <div className="w-full flex flex-col gap-2">{children}</div>;
};

const ProductForm: FC<{ className?: string }> = ({ className }) => {
  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string>("");

  const handleTag = () => {
    if (tag === "" || tags.includes(tag)) {
      return;
    } else {
      setTags([...tags, tag.toLowerCase()]);
      setTag("");
    }
  };

  const handleTagDelete = (st: string) => {
    const filteredTags = tags.filter((t) => t !== st);
    setTags(filteredTags);
  };

  const { mutate: createProduct, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: ProductFormPayload = {
        name: "Sample product",
        image:
          "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6000080f-9994-4c69-ba0e-1425a1976388/lebron-nxxt-gen-basketball-shoes-55g4w1.png",
        description: "This is the description of our sample product",
        category: "Basket ball Shoe",
        brand: "Nike",
        price: 200,
        tags: ["shoe", "nike", "basketball"],
      };

      const { data } = await axios.post("/api/product", payload);
      console.log("Data", data);

      return data;
    },
  });

  const handleSubmit = () => {
    if (isEditMode) {
      console.log("Edit mode submission");
    } else {
      createProduct();
    }
  };

  return (
    <div className={cn(className, "w-full flex flex-col gap-4")}>
      <FormGroup>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Image</Label>
        <Input
          type="file"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Category</Label>
        <Select onValueChange={(e) => setCategory(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="value-1">Value 1</SelectItem>
            <SelectItem value="value-2">Value 2</SelectItem>
            <SelectItem value="value-3">Value 3</SelectItem>
          </SelectContent>
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>Brand</Label>
        <Select onValueChange={(e) => setBrand(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Select brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="value-1">Value 1</SelectItem>
            <SelectItem value="value-2">Value 2</SelectItem>
            <SelectItem value="value-3">Value 3</SelectItem>
          </SelectContent>
        </Select>
        <FormGroup>
          <Label>Price</Label>
          <div className="relative">
            <p className="absolute top-[50%] left-4 translate-y-[-50%]">$</p>
            <Input
              className="pl-10"
              value={price || ""}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <Label>Tags</Label>
          <div className="flex items-center gap-2">
            <Input value={tag} onChange={(e) => setTag(e.target.value)} />
            <Button className="flex gap-2" onClick={handleTag}>
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.length > 0 &&
              tags?.map((t, i) => (
                <Badge
                  onClick={() => handleTagDelete(t)}
                  key={i}
                  className="cursor-pointer"
                  variant="outline"
                >
                  {t}
                </Badge>
              ))}
          </div>
        </FormGroup>
        <Button disabled={isLoading} onClick={handleSubmit} className="w-fit">
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          {isEditMode ? "Update the product" : "Add new product"}
        </Button>
      </FormGroup>
    </div>
  );
};

export default ProductForm;
