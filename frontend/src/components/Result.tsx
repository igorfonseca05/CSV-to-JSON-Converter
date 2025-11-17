import { Download } from "lucide-react";
import { LinesContainer } from "./LinesContainer";

interface ResulProps {
  allData: string[];
  time: number;
  clearStatesUp: () => void;
  fileName: string | undefined
}

export function Result({ allData, time, clearStatesUp, fileName }: ResulProps) {

  const last100 = allData.slice(-100)

  const blob = new Blob([JSON.stringify(allData, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  function formatar(ms: number) {
    const minutos = Math.floor(ms / 60000);
    const segundos = Math.floor((ms % 60000) / 1000);
    let mili = Math.floor((ms % 1000) / 10); // <<< só 2 dígitos

    if (minutos > 0) {
      return `${minutos}:${segundos}m`;
    } else if (segundos > 0) {
      return `${segundos}.${mili}s`;
    } else {
      return `${mili}ms`;
    }
  }

  return (
   <>
    <div
      className="flex flex-col items-center gap-8 rounded-xl border border-green-500/30 bg-green-500/10 p-6 sm:p-10 text-center"
      id="done-state"
    >
      <div className="flex flex-col items-center gap-3">
        <span className="material-symbols-outlined text-green-400 text-5xl!">
          check_circle
        </span>
        <h2 className="text-green-300 text-xl font-bold">
          Conversão Concluída!
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full text-left sm:text-center divide-y sm:divide-y-0 sm:divide-x divide-green-500/20">
        <div className="flex flex-col gap-1 pt-4 sm:pt-0 sm:px-4">
          <p className="text-slate-400 text-sm">Linhas Processadas</p>
          <p className="text-white text-lg font-semibold">{allData.length}</p>
        </div>
        <div className="flex flex-col gap-1 pt-4 sm:pt-0 sm:px-4">
          <p className="text-slate-400 text-sm">Tempo Total</p>
          <p className="text-white text-lg font-semibold">{formatar(time)}</p>
        </div>
        <div className="flex flex-col gap-1 pt-4 sm:pt-0 sm:px-4">
          <p className="text-slate-400 text-sm">Tamanho Final</p>
          <p className="text-white text-lg font-semibold">
            {(blob.size / (1024 * 1024)).toFixed(1)} MB
          </p>
        </div>
      </div>
      <a
        href={url}
        download={fileName? `${fileName}.json` : 'file.json'}
        className="flex w-full sm:w-auto min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-8 bg-indigo-500 text-white text-base font-bold leading-normal shadow-md hover:bg-indigo-600 transition-colors"
      >
        <Download />
        <span className="truncate">Download JSON</span>
      </a>
      <a className="text-gray-400 hover:text-gray-50 hover:cursor-pointer">
        <span className="truncate" onClick={clearStatesUp}>
          Converter novamente
        </span>
      </a>
    </div>
    <LinesContainer data={last100}/>
   </>
  );
}
