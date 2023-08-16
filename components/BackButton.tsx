"use client";

import React, { FC } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

const BackButton: FC<Props> = ({ className }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div
      onClick={handleBack}
      className="cursor-pointer flex gap-2 items-center"
    >
      <ChevronLeft width={16} height={16} /> Back
    </div>
  );
};

export default BackButton;
