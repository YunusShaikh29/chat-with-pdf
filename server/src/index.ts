import express from "express";
import cors from "cors";
import multer from "multer";
import { Queue } from "bullmq";

const queue = new Queue("pdf-upload-queue", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors());

app.get("/healthy-server", (req, res) => {
  console.log("server is working");
  res.json({
    message: "HEALTHY SERVER",
  });
});

app.post("/upload/pdf", upload.single("pdf"), async (req, res) => {
  await queue.add(
    "pdf-ready",
    JSON.stringify({
      filename: req.file?.originalname,
      destination: req.file?.destination,
      path: req.file?.path,
    })
  );
  res.json({
    status: "file uploaded",
  });
});

app.listen(8080, () => {
  console.log("server listening");
});
