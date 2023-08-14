import React, { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: ReactNode;
};

const Container: FC<Props> = ({ children, className, ...props }) => {
  return (
    <div className={cn(className, "max-w-[1900px] w-[96%] mx-auto")} {...props}>
      {children}
    </div>
  );
};

export default Container;
