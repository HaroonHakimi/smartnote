"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { generateUploadUrl } from "@/convex/fileStorage";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UploadPdf = ({ children, isMaxFile }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { user } = useUser();
  const generateUrl = useMutation(api.fileStorage.generateUploadUrl);
  const insertFileEntry = useMutation(api.fileStorage.addFileEntryToDB);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embedDocuments = useAction(api.myAction.ingest);

  const onUpload = async () => {
    setLoading(true);
    const postUrl = await generateUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });

    const { storageId } = await result.json();
    const fileId = uuid4();
    const fileUrl = await getFileUrl({ storageId });

    const resp = await insertFileEntry({
      fileId,
      storageId,
      fileName: fileName??'Untitled File',
      createdBy: user?.primaryEmailAddress?.emailAddress,
      fileUrl: fileUrl
    });

    try {
      const apiResponse = await axios.get(`/api/pdf-loader?pdfUrl=${fileUrl}`);
      console.log("API Response:", apiResponse.data); 
  
      if (apiResponse.data?.result) {
        console.log("Result:", apiResponse.data.result); 
        await embedDocuments({
          splitText: apiResponse.data.result,
          fileId,
        }); 
        toast('File is ready')
      } else {
        console.error("No result key in API response:", apiResponse.data);
      }
      router.push(`/workspace/${fileId}`);
    } catch (error) {
      console.error("Error during upload:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onFileSelect = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="">
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button disabled={isMaxFile} onClick={() => setOpen(true)}>Upload Pdf File</Button>
        </DialogTrigger>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Pdf File</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-3s flex flex-col gap-2 items-start">
                <div>Select a file to Upload: </div>
                <div className="w-full flex flex-col items-start gap-2 p-3 border rounded-md  ">
                  <input
                    onChange={(e) => onFileSelect(e)}
                    type="file"
                    accept="application/pdf"
                  />
                </div>
                <div className="mt-2 flex flex-col items-start gap-2 w-full">
                  <label htmlFor="">File Name: </label>
                  <Input
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="File Name"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button onClick={onUpload} disabled={loading} className="w-full">
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
            <DialogClose asChild>
              <Button className="w-full" type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadPdf;
