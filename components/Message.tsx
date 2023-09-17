import React, { FC, ReactElement } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type Props = {
  className?: string;
  Icon: ReactElement;
  title: String;
  description: String;
};

const Message: FC<Props> = ({ className = "", Icon, title, description }) => {
  return (
    <Alert className={className}>
      {React.cloneElement(Icon, { className: "w-4 h-4" })}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default Message;
