import React, { FC, ReactNode } from "react";

// Component
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

// Types
import TagType from "@/lib/types/tag";
import { Input } from "./ui/Input";
import { cn } from "@/lib/utils";

type ItemProps = {
  className?: string;
  children: ReactNode;
  onClick?: () => {};
  selected?: boolean;
};

const Item: FC<ItemProps> = ({
  className,
  children,
  onClick,
  selected,
  ...props
}) => (
  <div
    onClick={onClick}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent",
      selected && "opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

type Props = {
  label: string;
  items: TagType[];
  isLoading: boolean;
  isError: any;
  handleTag: (item: TagType) => {};
  selectedItems: TagType[];
};

const MultiSelector: FC<Props> = ({
  label,
  items,
  isLoading,
  isError,
  handleTag,
  selectedItems,
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:text-decoration-none">
          <Input
            className="cursor-pointer"
            type="text"
            value={label}
            readOnly
          />
        </AccordionTrigger>
        <AccordionContent className="rounded-md border border-input p-1">
          {isLoading ? (
            <Item>Please wait...</Item>
          ) : isError ? (
            <Item>Unable to fetch tags!</Item>
          ) : items.length > 0 ? (
            items?.map((item: TagType) => (
              <Item
                selected={selectedItems.some((i) => i.id === item.id)}
                key={item.id}
                onClick={() => handleTag(item)}
              >
                {item.name}
              </Item>
            ))
          ) : (
            <Item>No tag found.</Item>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MultiSelector;
