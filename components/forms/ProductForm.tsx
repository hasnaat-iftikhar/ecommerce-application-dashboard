"use client";

import React, { FC, ReactNode, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import TagType from "@/lib/types/tag";
import { ReloadIcon } from "@radix-ui/react-icons";
import MultiSelector from "../MultiSelector";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { UploadButton } from "@/lib/uploadthing";
import Message from "../Message";
import { AlertCircle, Loader } from "lucide-react";

type Props = {
  children: ReactNode;
  className?: string;
};

const FormGroup: FC<Props> = ({ className = "", children }) => {
  return (
    <div className={cn(className, "w-full flex flex-col gap-2")}>
      {children}
    </div>
  );
};

const ProductForm: FC<{ className?: string }> = ({ className }) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { slug } = useParams();
  const isEditMode = slug !== "create" ? true : false;

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [tags, setTags] = useState<TagType[]>([]);
  const [tagIDs, setTagIDs] = useState<string[]>([]);

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

  const {
    isLoading: isProductLoading,
    error: errorWhileFetchingProduct,
    data: productInfo,
  } = useQuery({
    queryKey: ["fetchingProductByID", slug],
    queryFn: () => fetch(`/api/product?id=${slug}`).then((res) => res.json()),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (productInfo) {
      setName(productInfo.data.name);
      setImage(productInfo.data.image);
      setDescription(productInfo.data.description);
      setCategory(productInfo.data.categoryId);
      setBrand(productInfo.data.brandId);
      setPrice(productInfo.data.price);
      setTagIDs(productInfo.data.tagIDs);
      setTags(productInfo.data.tags);
    }
  }, [productInfo, allCategories]);

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

  const { mutate: createProduct, isLoading: isCreateProductLoading } =
    useMutation({
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
          const { data } = await axios.post(
            "/api/product",
            JSON.stringify(payload)
          );

          if (data?.success === true) {
            setName("");
            setImage("");
            setImageUploading(false);
            setDescription("");
            setCategory("");
            setBrand("");
            setPrice(0);
            setTags([]);
            setTagIDs([]);

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

  const { mutate: updateProduct, isLoading: isEditProductLoading } =
    useMutation({
      mutationFn: async () => {
        const payload: any = {
          name,
          image: image as string,
          description,
          category,
          brand,
          price,
          tags: tagIDs,
        };

        console.log("payload", payload);

        try {
          const { data } = await axios.put(
            `/api/product?id=${slug}`,
            JSON.stringify(payload)
          );

          if (data?.success === true) {
            setName("");
            setImage("");
            setImageUploading(false);
            setDescription("");
            setCategory("");
            setBrand("");
            setPrice(0);
            setTags([]);
            setTagIDs([]);

            toast({
              variant: "default",
              title: "Success!",
              description: data?.message,
            });

            await queryClient.refetchQueries(["fetchingProducts"]);

            router.back();
          }
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
      updateProduct();
    } else {
      createProduct();
    }
  };

  if (isProductLoading && isEditMode) {
    return (
      <Message
        className={className}
        Icon={<Loader />}
        title="Please wait"
        description="We are fetching product right now!"
      />
    );
  }

  if (errorWhileFetchingProduct && isEditMode) {
    return (
      <Message
        className={className}
        Icon={<AlertCircle />}
        title="Error :P"
        description="We are facing error while fetching product"
      />
    );
  }

  return (
    <div className={cn(className, "w-full flex flex-col gap-4")}>
      <FormGroup>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Image</Label>
        <div className="relative" id="imageUploader">
          {imageUploading && (
            <div className="bg-black opacity-10 rounded-[6px] absolute top-0 left-0 right-0 bottom-0 z-[2]" />
          )}
          <UploadButton
            className="opacity-0 absolute top-0 left-0 right-0 bottom-0"
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              setImageUploading(false);
              if (res[0].fileUrl) {
                console.log(res[0].fileUrl);
                setImage(res[0].fileUrl);
              }
            }}
            onUploadBegin={() => {
              setImageUploading(true);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          <Input
            readOnly={true}
            value={image ? image : "Please select an image"}
          />
        </div>
        {imageUploading && <Label>Please wait...</Label>}
        {image && (
          <Image
            className="object-contain"
            width={200}
            height={200}
            src={`${image}`}
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
        <Select
          onValueChange={(e) => {
            setCategory(e);
          }}
          value={category}
        >
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
        <Select onValueChange={(e) => setBrand(e)} value={brand}>
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
      <Button
        disabled={isCreateProductLoading || isEditProductLoading}
        onClick={handleSubmit}
        className="w-fit"
      >
        {(isCreateProductLoading || isEditProductLoading) && (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isEditMode ? "Update the product" : "Add new product"}
      </Button>
    </div>
  );
};

export default ProductForm;
