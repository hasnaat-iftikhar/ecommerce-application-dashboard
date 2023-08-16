"use client";

import React, { FC, ReactNode, useState } from "react";
import { useParams } from "next/navigation";

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

// Libs
import { cn } from "@/lib/utils";

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
        <Button className="w-fit">
          {isEditMode ? "Update the product" : "Add new product"}
        </Button>
      </FormGroup>
    </div>
  );
};

export default ProductForm;
