"use client";

import { useRef, useEffect } from "react";
import { Virtuoso } from "react-virtuoso";

export function LinesContainer({ data }: { data: string[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const div = bottomRef.current;
    if (!div) return;

    div.scrollTop = div.scrollHeight;
  }, [data]);

  console.log(data)

  return (
    <>
      <div className="flex flex-col gap-6" id="processing-state">
         <p className="text-white text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">
              Seu arquivo
            </p>
        <div
          ref={bottomRef}
          className="flex flex-col max-h-100 gap-4 rounded-lg bg-slate-900 p-4 border border-slate-700 h-auto overflow-y-auto overflow-x-hidden"
        >
          <Virtuoso
          className="custom-scroll-y hide-scroll-x"
            style={{ height: 600}}
            data={[JSON.stringify(data)]}
            followOutput={(isAtBottom) => true}
            itemContent={(index, line) => (
              <code className="font-mono text-sm text-slate-400">{line}</code>
            )}
          />
        </div>
      </div>
    </>
  );
}
