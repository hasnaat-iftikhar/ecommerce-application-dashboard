import React from "react";
import { getServerSession } from "next-auth";

// Components
import Container from "./Container";
import UserAccountNav from "./UserAccountNav";
import { Button } from "./ui/Button";
import { authOptions } from "@/lib/auth";

const Navabr = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="py-3 border-b border-[#f3f3f3]">
      <Container>
        <div className="flex justify-between items-center">
          <h1 className="text-white bg-gray-800 text-base font-normal py-2 px-4 rounded-lg cursor-default">
            Kicks <span className="text-xs">Dashboard</span>
          </h1>
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Button>SignIn</Button>
          )}
        </div>
      </Container>
    </header>
  );
};

export default Navabr;
