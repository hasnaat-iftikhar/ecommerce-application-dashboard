"use client";

import { FC } from "react";
import Message from "@/components/Message";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { cn } from "@/lib/utils";
import { AlertCircle, Loader } from "lucide-react";

type Props = {
  className?: string;
};

const UsersTable: FC<Props> = ({ className }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchingUsers"],
    queryFn: () => fetch("/api/user").then((res) => res.json()),
  });

  if (isLoading)
    return (
      <Message
        Icon={<Loader />}
        title="Please wait..."
        description="We are in a call with the server to fetch users!"
      />
    );

  if (error) {
    return (
      <Message
        Icon={<AlertCircle />}
        title="Error :P"
        description="There is an issue while fetching users!"
      />
    );
  }

  {
    data && console.log("data", data);
  }

  return (
    <div className={cn(className)}>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
};

export default UsersTable;
