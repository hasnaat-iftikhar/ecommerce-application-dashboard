import React, { FC, ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

// Components and Libs
import Sidebar from "@/components/Sidebar";
import Content from "@/components/dashboard/Content";
import { authOptions } from "@/lib/auth";

// Constants
import ROUTES from "@/constants/routes";

type Props = {
  children: ReactNode;
};

export const metadata = {
  title: "Dashboard | Ecommerce kicks",
  description: "Ecommerce application",
};

const DashboardLayout: FC<Props> = async ({ children }) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect(ROUTES.SIGNIN);
  } else {
    return (
      <div className="flex flex-col h-full lg:flex-row">
        <Sidebar className="w-full lg:h-full border-b border-[#f3f3f3] p-3 lg:w-[200px] lg:border-r" />
        <Content className="flex-1 p-3">{children}</Content>
      </div>
    );
  }
};

export default DashboardLayout;
