import { Worker } from "bullmq";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import type { AttributeInfo } from "langchain/chains/query_constructor";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf"
import {QdrantClient} from "@qdrant/js-client-rest"

const worker = new Worker(
  "pdf-upload-queue",
  async (job) => {
    // console.log("Job", job.data);
    const parsedData = JSON.parse(job.data)
    /*
    read the pdf from path, path = parsedData.path
    chunk the pdf,
    call embedding model for every chunk
    store the chunk in the qdrant db
    */

    const loader = new PDFLoader(parsedData.path)
    const document = await loader.load()
    // console.log(document)

    const client = new QdrantClient({url: process.env.QDRANT_URL })
    const embedding = new OpenAIEmbeddings()
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);
