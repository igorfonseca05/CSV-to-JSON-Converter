import { CircleX } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorProps {
  title: string;
  textContent: string;
}

function Error({ title, textContent }: ErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-4">
      <CircleX className="text-red-400" />
        <div className="flex flex-col">
          <p className="text-base font-medium text-red-400">{title}</p>
          <p className="text-sm text-red-500 dark:text-[#92a4c9]">
            {textContent}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Error;
