import { FC, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Constants
import ROUTES from "@/constants/routes";

type Props = {
  children: ReactNode;
};

const AuthLayout: FC<Props> = async ({ children }) => {
  const session = await getServerSession();

  if (session) {
    return redirect(ROUTES.DASHBOARD);
  }

  return <>{children}</>;
};

export default AuthLayout;
