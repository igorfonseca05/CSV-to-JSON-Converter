import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import csv from "csv-parser";
import { createReadStream } from "fs";
import fs from "fs";
import { uid } from "uid";


const app = express();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    callback(
      null,
      `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`
    );
  },
});

const upload = multer({ storage });
const port = process.env.port || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "https://csv-to-json-converter-rouge.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

export const clients: Record<string, any> = {};

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor TypeScript no ar! 🚀");
});

app.get("/events", (req, res) => {
  const jobID = req.query.jobID as string;

  // Configurando SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients[jobID] = res;

  req.on("close", () => {
    delete clients[jobID];
  });
});

async function fileProcessor(
  filePath: string,
  jobID: string,
  fileSize?: number
) {
  while (!clients[jobID]) {
    await new Promise((r) => setTimeout(r, 50));
  }

  const client = clients[jobID];

  if (!client || !filePath || !fileSize)
    return client.status(505).json({ message: "error" });

  // Convertendo arquivo e enviando para o frontend
  const readStrem = fs.createReadStream(filePath);

  let buffer: string[] = [];
  let processedBytes = 0;

  readStrem.on("data", (chunk) => {
    processedBytes += chunk.length;
    const progress = (processedBytes / fileSize) * 100;
    client.write(`event: progress\ndata: ${progress.toFixed(0)}\n\n`);
  });

  readStrem
    .pipe(csv())
    .on("data", (row) => {
      buffer.push(row);
      if (buffer.length >= 5000) {
        client.write(`event: getting\ndata: ${JSON.stringify(buffer)}\n\n`);
        buffer = [];
      }
    })
    .on("end", () => {
      if (buffer.length > 0) {
        client.write(`event: getting\ndata: ${JSON.stringify(buffer)}\n\n`);
      }

      client.write(`event: done\ndata: ${Date.now()}\n\n`);
      client.end();
      fs.unlinkSync(filePath); // Remover arquivo após leitura
    })
    .on("error", (err) => {
      client.write(`event: error\ndata: ${err.message}\n\n`);
      client.end();
    });
}

// Rota que recebe arquivo
app.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    const filePath = req.file?.path;
    const jobID = uid();

    if (!jobID)
      return res.json({
        message: "Error ao criar ID de processamente",
        status: "error",
      });

    if (!filePath)
      return res.json({
        message: "Error ao obter caminho no arquivo",
        status: "error",
      });

    const ext = path.extname(filePath);

    if (ext !== '.csv')
      return res.status(400).json({
        message: "Formato inválido. Envie apenas arquivos CSV.",
        status: "error",
      });


    res.json({
      message: "Processamento iniciado",
      status: "processing",
      jobID,
    });

    process.nextTick(() => fileProcessor(filePath, jobID, req.file?.size));
  }
);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
