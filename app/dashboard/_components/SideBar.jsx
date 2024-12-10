"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdf from "./UploadPdf";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideBar = () => {
  const { user } = useUser();
  const path = usePathname();

  const getUserInfo = useQuery(api?.user?.getUserInfo, {
    email: user?.primaryEmailAddress?.emailAddress,
  });

  const fileList = useQuery(api.fileStorage.getUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  return (
    <div className="shadow-md h-screen p-7 ">
      <Link href={'/'} className="text-inherit no-underline ">
      <Image  src={"/logo.svg"} alt="logo" width={75} height={75} />
      </Link>
      <div className="mt-10">
        <UploadPdf isMaxFile={fileList?.length >= 5 && !getUserInfo.upgrade}>
          <Button className="w-100">Upload PDF</Button>
        </UploadPdf>
        <Link href={"/dashboard"} className="text-inherit no-underline">
          <div
            className={`${path === "/dashboard" ? " bg-slate-200" : ""} rounded-lg `}
          >
            <SideBarComp text="Workspace" component={Layout} />
          </div>
        </Link>
        <Link className="text-inherit no-underline" href={"/dashboard/upgrade"}>
          <div
            className={`text-inherit no-underline ${path === "/dashboard/upgrade" ? " bg-slate-200" : ""} rounded-lg`}
          >
            <SideBarComp text="Upgrade" component={Shield} />
          </div>
        </Link>
      </div>{" "}
      {!getUserInfo?.upgrade && (
        <div className="absolute bottom-20 w-[80%] space-y-2">
          <Progress value={(fileList?.length / 5) * 100} />
          <p className="text-sm ">{fileList?.length} out of 5 PDFs Uploaded </p>
          <p className="text-sm text-gray-400">Upgrade to upload more PDFs</p>
        </div>
      )}
    </div>
  );
};

const SideBarComp = ({ text, component: Component }) => {
  return (
    <div
      className={`flex items-center  gap-2 p-3 mt-2 hover:bg-slate-200 rounded-lg
        transition duration-300 ease-in-out cursor-pointer`}
    >
      <Component width={25} height={25} />
      <h3 className="text-[18px]">{text}</h3>
    </div>
  );
};

export default SideBar;
