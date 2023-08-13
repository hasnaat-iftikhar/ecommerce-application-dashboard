"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

interface Props extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Products",
    href: "/dashboard/products",
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
  },
  {
    title: "Users",
    href: "/dashboard/users",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
  },
];

function Sidebar({ className, ...props }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-[#f3f3f3]" : "hover:bg-[#f3f3f3]",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
