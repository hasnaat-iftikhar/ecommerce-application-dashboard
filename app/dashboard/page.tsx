import React, { FC, ReactNode } from "react";

export const metadata = {
  title: "Dashboard | Ecommerce kicks",
  description: "Ecommerce application",
};

type Props = {
  children: ReactNode;
};

const Dashboard: FC<Props> = ({ children }) => {
  return <p>Dashboard</p>;
};

export default Dashboard;
