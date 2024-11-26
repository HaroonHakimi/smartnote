import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


const pdfUrl =
  "https://uncommon-moose-903.convex.cloud/api/storage/8ff4a81a-22cc-4a40-ba3b-3e18cc4843a1";

export async function GET(req) {
  const pdfTextContent = await loadPdfFile();

  return NextResponse.json({ result: pdfTextContent });
}

const loadPdfFile = async () => {
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  for (let i = 0; i < docs.length; i++) {
    pdfTextContent += docs[i].pageContent;
  }
  return textSplitting(pdfTextContent);
};

const textSplitting = async (text) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([text]);

  let splitterList = []

  for (let i = 0; i < output.length; i++) {
    splitterList.push(output[i].pageContent);
  }
  return splitterList

  
};
