"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import PdfViewer from "../_components/PdfViewer";
import {  useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import TextEditor from "../_components/TextEditor";

const Workspace = () => {
  const { fileId } = useParams();

  const fileInfo = useQuery(api.fileStorage.getFileRecord, { fileId });

  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);

  
  return (
    <div>
      <WorkspaceHeader fileName={fileInfo?.fileName} />
      <div className="grid grid-cols-2 gap-5">
        <div><TextEditor fileId={fileId} /></div>
        <div>
          {fileInfo?.fileUrl ? (
            <PdfViewer fileUrl={fileInfo.fileUrl} />
          ) : (
            <div>Loading PDF Viewer...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
