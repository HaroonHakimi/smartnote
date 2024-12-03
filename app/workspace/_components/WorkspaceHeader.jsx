import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WorkspaceHeader = ({ fileName }) => {
  return (
    <div className="p-4 flex justify-between shadow-md">
      <Link className="cursor-pointer" href="/dashboard"><Image src={"/logo.svg"} alt="logo" width={50} height={50} /></Link>
      <h3>{fileName}</h3>
      <div className="flex gap-2 items-center">
        <Button>Save</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default WorkspaceHeader;
