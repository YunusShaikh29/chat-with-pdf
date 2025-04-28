import { Worker } from "bullmq";

const worker = new Worker(
  "pdf-upload-queue",
  async (job) => {
    console.log("Job", job.data);
  },
  {
    connection: {
      host: "localhost",
      port: 6379,
    },
  }
);
