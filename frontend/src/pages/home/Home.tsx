import { FaFile, FaGithub, FaLinkedin } from "react-icons/fa";
import UploadForm from "./components/UploadForm";

function Home() {
  return (
    <div className="bg-[#101622] font-['Manrope'] text-white">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-0 md:px-10 lg:px-40 flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full gap-8 md:gap-10">
              <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 sm:px-10 py-3">
                <div className="flex items-center gap-4 text-white">
                  <div className="size-6 text-[#135bec]">
                    <FaFile size={28} />
                  </div>
                  <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                   CSV → JSON Converter
                  </h2>
                </div>
                <a
                  className="hidden sm:flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#135bec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#135bec]/90 transition-colors"
                  href="#"
                >
                  <span className="truncate">Documentação</span>
                </a>
              </header>
              <header className="flex flex-col items-center gap-2 text-center">
                {/* <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
                  CSV → JSON Converter
                </h1> */}
                <p className="text-slate-400 text-sm sm:text-base">
                  Real-time processing powered by SSE
                </p>
              </header>
              <main className="flex flex-col flex-1 gap-8 md:gap-12 px-2">
                <UploadForm />
                <div className="flex grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-[#135bec]/20 text-[#135bec]">
                      <span className="material-symbols-outlined">
                        security
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-medium leading-normal">
                        Upload seguro
                      </p>
                      <p className="text-[#92a4c9] text-sm font-normal leading-normal">
                        Seus arquivos são tratados com a máxima segurança e
                        privacidade.
                      </p>
                    </div>
                  </div>
                  <div className=" flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-[#135bec]/20 text-[#135bec]">
                      <span className="material-symbols-outlined">stream</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-medium leading-normal">
                        Processamento otimizado
                      </p>
                      <p className="text-[#92a4c9] text-sm font-normal leading-normal">
                        Processamento eficiente de dados em tempo real,
                        otimizado para performance.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-[#135bec]/20 text-[#135bec]">
                      <span className="material-symbols-outlined">
                        upload_file
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-base font-medium leading-normal">
                        Suporte a arquivos grandes
                      </p>
                      <p className="text-[#92a4c9] text-sm font-normal leading-normal">
                        Envie arquivos de até 100 MB sem preocupações.
                      </p>
                    </div>
                  </div>
                </div>
              </main>
              <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t border-solid border-white/10 mt-auto">
                <div className="flex flex-wrap justify-center gap-6">
                  <a
                    aria-label="GitHub"
                    className="text-[#92a4c9] hover:text-white transition-colors"
                    href="https://github.com/igorfonseca05"
                    target="_blank"
                  >
                    <FaGithub />
                  </a>
                  <a
                    aria-label="LinkedIn"
                    className="text-[#92a4c9] hover:text-white transition-colors"
                    href="https://www.linkedin.com/in/igorfondev/"
                    target="_blank"
                  >
                    <FaLinkedin />
                  </a>
                </div>
                <p className="text-[#92a4c9] text-sm font-normal leading-normal">
                  © {new Date().getFullYear()} File Processor
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
