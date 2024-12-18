"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UploadPdf from "./_components/UploadPdf";

const Dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const files = useQuery(api.fileStorage.getUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });

  const getUserInfo = useQuery(api?.user?.getUserInfo, {
    email: user?.primaryEmailAddress?.emailAddress,
  });

  useEffect(() => {
    if (files) {
      setFileList(files);
      setLoading(false);
    }
  }, [files]);

  console.log(fileList);

  return (
    <div>
      <h2 className="font-medium text-2xl">Workspace</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xl:grid-cols-5 mt-10">
        {!loading ? (
          fileList.length > 0 ? (
            fileList.map((file) => (
              <Link
                className="text-inherit no-underline"
                key={file.fileId}
                href={`/workspace/${file.fileId}`}
              >
                <div
                  className="flex p-5 shadow-md rounded-md flex-col items-center justify-center
              border hover:cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out"
                >
                  <Image
                    src={`/pdf-file.png`}
                    alt="file"
                    width={50}
                    height={50}
                  />
                  <h4 className="mt-2 font-medium">{file?.fileName}</h4>
                </div>
              </Link>
            ))
          ) : (
            <>
            <UploadPdf isMaxFile={fileList?.length >= 5 && !getUserInfo.upgrade}>
              <div className="p-5 flex flex-col gap-2 cursor-pointer rounded-lg items-center justify-center
               border-dashed border-2 border-slate-400">
                <Image
                  src={`/pdf-file.png`}
                  alt="file"
                  width={50}
                  height={50}
                />
                <span className="text-sm font-bold">Upload PDF</span>
              </div>
              </UploadPdf>
            </>
          )
        ) : (
          new Array(5)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-md h-[150px] animate-pulse"
              ></div>
            ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
