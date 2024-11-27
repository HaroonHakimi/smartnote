import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";



export async function GET(req) {
  const reqUrl = req.url;
  const { searchParams} = new URL(reqUrl);
  const pdfUrl = searchParams.get("pdfUrl");
  console.log(pdfUrl)

  const pdfTextContent = await loadPdfFile(pdfUrl);

  return NextResponse.json({ result: pdfTextContent });
}

const loadPdfFile = async (url) => {
  const response = await fetch(url);
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
