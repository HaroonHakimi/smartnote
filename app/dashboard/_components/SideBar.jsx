import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdf from "./UploadPdf";

const SideBar = () => {
  return (
    <div className="shadow-md h-screen p-7 ">
      <Image src={"/logo.svg"} alt="logo" width={75} height={75} />
      <div className="mt-10">
        <UploadPdf>
          <Button className="w-100">Upload PDF</Button>
        </UploadPdf>
        <SideBarComp text="Workspace" component={Layout} />
        <SideBarComp text="Upgrade" component={Shield} />
      </div>
      <div className="absolute bottom-20 w-[80%] space-y-2">
        <Progress value={33} />
        <p className="text-sm ">2/5 Pdf Uploaded</p>
        <p className="text-sm  text-gray-400">Upgrade to Uplaod more PDF's</p>
      </div>
    </div>
  );
};

const SideBarComp = ({ text, component: Component }) => {
  return (
    <div
      className="flex items-center  gap-2 p-3 mt-2 hover:bg-slate-200 rounded-lg
        transition duration-300 ease-in-out cursor-pointer"
    >
      <Component width={25} height={25} />
      <h3 className="text-[18px]">{text}</h3>
    </div>
  );
};

export default SideBar;
