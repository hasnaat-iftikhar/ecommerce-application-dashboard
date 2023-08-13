import React, { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

const Content: FC<Props> = ({ className, children, ...props }) => {
  return (
    <section className={cn(className)} {...props}>
      {children}
    </section>
  );
};

export default Content;
