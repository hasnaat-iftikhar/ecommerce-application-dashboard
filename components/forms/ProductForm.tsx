"use client";

import React, { ChangeEvent, FC, ReactNode, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import TagType from "@/lib/types/tag";
import { ReloadIcon } from "@radix-ui/react-icons";
import MultiSelector from "../MultiSelector";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

type Props = {
  children: ReactNode;
};

const FormGroup: FC<Props> = ({ children }) => {
  return <div className="w-full flex flex-col gap-2">{children}</div>;
};

const ProductForm: FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  const {
    isLoading: areCategoriesLoading,
    error: categoriesError,
    data: allCategories,
  } = useQuery({
    queryKey: ["fetchingCategories"],
    queryFn: () => fetch("/api/category").then((res) => res.json()),
  });

  const {
    isLoading: areBrandsLoading,
    error: brandsError,
    data: allBrands,
  } = useQuery({
    queryKey: ["fetchingBrands"],
    queryFn: () => fetch("/api/brand").then((res) => res.json()),
  });

  const {
    isLoading: areTagsLoading,
    error: tagsError,
    data: allTags,
  } = useQuery({
    queryKey: ["fetchingTags"],
    queryFn: () => fetch("/api/tag").then((res) => res.json()),
  });

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [tags, setTags] = useState<TagType[]>([]);
  const [tagIDs, setTagIDs] = useState<string[]>([]);

  const handleTag = (selectedTag: TagType) => {
    if (tags.some((t) => t.id === selectedTag.id)) {
      return;
    } else {
      setTags([...tags, selectedTag]);
      setTagIDs([...tagIDs, selectedTag.id]);
    }
  };

  const handleTagDelete = (selectedTag: TagType) => {
    const filteredTags = tags.filter((item) => item.id !== selectedTag.id);
    setTags(filteredTags);

    const filteredTagIDs = tagIDs.filter((id) => id !== selectedTag.id);
    setTagIDs(filteredTagIDs);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result) {
          setImage(result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const { mutate: createProduct, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: any = {
        name,
        image: image as string | null,
        description,
        category,
        brand,
        price,
        tags: tagIDs,
      };

      try {
        const { data } = await axios.post("/api/product", payload);

        if (data?.success === true) {
          toast({
            variant: "default",
            title: "Success!",
            description: data?.message,
          });
        }

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
        <Input accept="image/*" type="file" onChange={handleImageChange} />
        {image && (
          <Image
            width={200}
            height={200}
            src={image.toString()}
            alt="Selected"
          />
        )}
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
            {areCategoriesLoading ? (
              <SelectItem value="">Please wait...</SelectItem>
            ) : categoriesError ? (
              <SelectItem value="">Unable to fetch categories!</SelectItem>
            ) : allCategories?.data.length > 0 ? (
              allCategories.data?.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="">No category found.</SelectItem>
            )}
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
            {areBrandsLoading ? (
              <SelectItem value="">Please wait...</SelectItem>
            ) : brandsError ? (
              <SelectItem value="">Unable to fetch brands!</SelectItem>
            ) : allBrands?.data.length > 0 ? (
              allBrands.data?.map((c: any) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="">No brand found.</SelectItem>
            )}
          </SelectContent>
        </Select>
      </FormGroup>
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
        <Select>
          <MultiSelector
            label="Select tags"
            items={allTags?.data}
            isError={tagsError}
            isLoading={areTagsLoading}
            handleTag={async (item) => handleTag(item)}
            selectedItems={tags}
          />
          <div className="flex flex-wrap gap-1">
            {tags.length > 0 &&
              tags?.map((item: TagType) => (
                <Badge
                  onClick={() => handleTagDelete(item)}
                  key={item.id}
                  className="cursor-pointer"
                  variant="outline"
                >
                  {item.name}
                </Badge>
              ))}
          </div>
        </Select>
      </FormGroup>
      <Button disabled={isLoading} onClick={handleSubmit} className="w-fit">
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {isEditMode ? "Update the product" : "Add new product"}
      </Button>
    </div>
  );
};

export default ProductForm;
