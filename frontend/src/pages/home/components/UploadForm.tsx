import { motion } from "framer-motion";
import { FileUpIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { Result } from "../../../components/Result";

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState<number | null>(0);
  const [id, setID] = useState("");
  const [done, setDone] = useState(false);

  const [time, setTime] = useState<number>(0);

  const allData = useRef<string[]>([]);

  const url = "http://localhost:3000/upload";

  // Limitar tamanho do arquivo
  const onFile = useCallback((file: File | null) => {
    if (!file) return;
    setError(null);
    const maxSizeMb = 100;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`Arquivo excedeu o limite de ${maxSizeMb}MB`);
      setFile(null);
      return;
    }

    setFile(file);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) onFile(e.target.files[0]);
  }

  // Remover comportamento padrão do navegador
  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length) {
      await onFile(dt.files[0]);
    }
  }
  // ------------------------------------------

  function clearStatesUp() {
    setIsDragging(false);
    setUpload(false);
    setProgress(0);
    setFile(null);
    setError(null);
    setDone(false);
    allData.current = [];
  }

  // Função principal de upload
  async function upload_file() {
    if (!file) {
      setError("Nenhum arquivo selecionado.");
      return;
    }

    setTime(Date.now());
    setUpload(true);
    setError(null);
    // setProgress(0);

    // converter dado para binário
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const data = await res.data;
      setID(data.jobID);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro, tente novamente mais tarde!");
      }
      setProgress(0);
      setUpload(false);
      setFile(null);
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);

  useEffect(() => {
    if (!id) return;
    const event = new EventSource(`http://localhost:3000/events?jobID=${id}`);

    setTime(Date.now());

    event.addEventListener("getting", (e) => {
      console.log(e.data);
      const chunk = JSON.parse(e.data);
      allData.current.push(...chunk);
    });

    event.addEventListener("done", () => {
      setDone(true);
      setUpload(false);
      setTime((prev) => Date.now() - prev);
      event.close();
    });
    event.addEventListener("error", () => {
      setError("Erro na conversão do arquivo");
      setProgress(0);
      setUpload(false);
      setFile(null);
      event.close();
    });

    event.addEventListener("progress", (e) => {
      setProgress(Number(e.data)); // 0 a 100
    });
  }, [id]);

  useEffect(() => {
    if (!file) return;

    if (file?.name.slice(file?.name.lastIndexOf(".") + 1) !== "csv") {
      setError("Formato inválido. Envie apenas arquivos CSV.");
      setFile(null);
    }
  }, [file]);

  return (
    <motion.div
      draggable={false}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col flex-1 gap-8 md:gap-12 px-4"
    >
      {done && (
        <Result
          allData={allData.current}
          time={time}
          clearStatesUp={clearStatesUp}
          fileName={file?.name}
        />
      )}

      {upload && !done && (
        <div className="flex-col items-center justify-center bg-white/5 border border-white/10 gap-6 rounded-xl min-h-[239px]  sm:p-8 md:p-14">
          <p className="text-white text-xl sm:text-2xl mb-8 font-bold text-center leading-tight tracking-[-0.015em]">
            Processando: {progress}%
          </p>
          <div className="h-2 w-full rounded-full bg-slate-800">
            <div
              className="h-2 mt-2 rounded-full bg-indigo-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {!upload && !done && (
        <form
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          id="uploadForm"
          encType="multipart/form-data"
          className={`flex-col items-center justify-center gap-6 rounded-xl min-h-80 p-6 sm:p-8 md:p-14 ${
            isDragging
              ? " bg-white/10 border border-indigo-600"
              : " bg-white/5 border border-white/10  "
          }`}
          draggable={false}
        >
          {isDragging && (
            <p className="text-white mt-23 block text-center text-xl sm:text-2xl font-bold ">
              Solte o arquivo
            </p>
          )}
          {!isDragging && (
            <>
              <div
                draggable={false}
                className="flex justify-center flex-col items-center gap-2 text-center"
              >
                <div className="p-4 bg-indigo-500/10 rounded-full mb-4">
                  <FileUpIcon className="text-indigo-500" size={40} />
                </div>
                <p className="text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">
                  {file
                    ? "Seu arquivo está pronto para envio"
                    : "Arraste e solte seu arquivo .csv aqui"}
                </p>
                <p className="text-[#92a4c9] text-sm font-normal leading-normal">
                  {file
                    ? 'Clique em "Enviar arquivo" para iniciar o processamento.'
                    : "ou"}
                </p>
              </div>
              <label
                htmlFor="file"
                className="flex min-w-[84px] max-w-60 cursor-pointer items-center justify-center m-auto mt-4 overflow-hidden rounded-lg h-11 px-5 bg-slate-700 text-white text-sm font-medium leading-normal tracking-wide hover:bg-slate-600 transition-colors"
              >
                <span className="truncate">
                  {file ? file.name : "Selecionar arquivo"}
                </span>
                <input
                  id="file"
                  type="file"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </>
          )}
        </form>
      )}

      {!done && (
        <button
          onClick={upload_file}
          disabled={progress ? true : false}
          className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-15 px-4 bg-indigo-600 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-indigo-700 transition-colors disabled:bg-indigo-800 disabled:cursor-not-allowed"
        >
          {upload ? (
            <span className="animation-pulse">Enviando...</span>
          ) : (
            "Enviar arquivo"
          )}
        </button>
      )}
    </motion.div>
  );
}

export default UploadForm;
