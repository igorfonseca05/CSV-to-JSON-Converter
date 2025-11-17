import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

function sucess() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-green-500/30 bg-green-500/10 p-6 sm:p-8 text-center">
        <span className="material-symbols-outlined text-green-400 text-4xl">
          <CheckCircle />
        </span>
        <div className="flex flex-col gap-1">
          <p className="text-green-300 text-lg font-bold">Upload concluído!</p>
          <p className="text-green-400/80 text-sm">
            Seu arquivo foi processado com sucesso.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default sucess;
