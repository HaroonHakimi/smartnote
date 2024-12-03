"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);
  const checkUser = async () => {
    const result = await createUser({
      userName: user.fullName,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    });
    console.log(result);
  };

  useEffect(() => {
    user && checkUser();
  }, [user]);
  return (
    <div>
      <h1>SmartNote</h1>
      <Link href={"/dashboard"}>
        <Button>Hello</Button>
      </Link>
      <UserButton />
    </div>
  );
}
