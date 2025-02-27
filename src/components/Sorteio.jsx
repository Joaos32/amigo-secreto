import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Sorteio = ({ participantes }) => {
  const [sorteados, setSorteados] = useState([]);

  const sortear = () => {
    if (participantes.length < 2) {
      toast.error("Adicione pelo menos dois participantes!");
      return;
    }

    let embaralhados = [...participantes].sort(() => Math.random() - 0.5);
    let resultado = embaralhados.map((p, i) => ({
      amigo: p,
      sorteado: embaralhados[(i + 1) % embaralhados.length],
    }));

    setSorteados(resultado);
    toast.success("Sorteio realizado com sucesso!");
  };

  return (
    <motion.div
      className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={sortear}
        className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Sortear 🎲
      </motion.button>

      {sorteados.length > 0 && (
        <motion.ul
          className="mt-4 border p-4 rounded bg-gray-100 dark:bg-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sorteados.map((s, i) => (
            <motion.li
              key={i}
              className="border-b py-2 text-lg font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              {s.amigo} → <span className="font-bold text-blue-500">{s.sorteado}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default Sorteio;
