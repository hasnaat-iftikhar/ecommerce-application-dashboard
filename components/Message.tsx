import React, { FC, ReactElement } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type Props = {
  Icon: ReactElement;
  title: String;
  description: String;
};

const Message: FC<Props> = ({ Icon, title, description }) => {
  return (
    <Alert>
      {React.cloneElement(Icon, { className: "w-4 h-4" })}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default Message;
