import React from "react";
import UserAuthForm from "@/components/UserAuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

const SignIn = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <CardDescription>
            By continuing, you are setting up an account and agree to our User
            Agreement and Privacy Policy.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuthForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default SignIn;
