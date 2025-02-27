import { motion } from "framer-motion";
import { useHistory } from "../context/HistoryContext";
import { FaTrash, FaDownload, FaUpload } from "react-icons/fa";
import { exportToJson, exportToCsv } from "../utils/exportData";
import { importFromJson, importFromCsv } from "../utils/importData";

const Historico = () => {
  const { history, removeFromHistory, clearHistory } = useHistory();

  return (
    <motion.div 
      className="p-6 bg-white rounded shadow-lg max-w-lg mx-auto mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">📜 Histórico de Sorteios</h2>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <motion.button 
          onClick={() => exportToJson(history)}
          className="flex items-center gap-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          whileHover={{ scale: 1.05 }}
        >
          <FaDownload /> Exportar JSON
        </motion.button>

        <motion.button 
          onClick={() => exportToCsv(history)}
          className="flex items-center gap-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          whileHover={{ scale: 1.05 }}
        >
          <FaDownload /> Exportar CSV
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <motion.label 
          className="flex items-center gap-2 bg-gray-300 p-2 rounded cursor-pointer hover:bg-gray-400"
          whileHover={{ scale: 1.05 }}
        >
          <FaUpload /> Importar JSON
          <input type="file" accept=".json" onChange={(e) => importFromJson(e)} className="hidden" />
        </motion.label>

        <motion.label 
          className="flex items-center gap-2 bg-gray-300 p-2 rounded cursor-pointer hover:bg-gray-400"
          whileHover={{ scale: 1.05 }}
        >
          <FaUpload /> Importar CSV
          <input type="file" accept=".csv" onChange={(e) => importFromCsv(e)} className="hidden" />
        </motion.label>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum sorteio foi realizado ainda.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {history.map(({ id, date, sorteio }) => (
              <motion.li 
                key={id} 
                className="border p-3 bg-gray-50 rounded-lg shadow flex justify-between items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <p className="text-sm text-gray-600">📅 {date}</p>
                  <ul className="text-sm text-gray-800">
                    {sorteio.map(({ amigo, sorteado }, index) => (
                      <li key={index}>🔹 {amigo} → {sorteado}</li>
                    ))}
                  </ul>
                </div>
                <button 
                  onClick={() => removeFromHistory(id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </motion.li>
            ))}
          </ul>

          <motion.button 
            onClick={clearHistory} 
            className="mt-6 bg-red-500 text-white p-2 rounded w-full hover:bg-red-600 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <FaTrash /> Apagar Todo o Histórico
          </motion.button>
        </>
      )}
    </motion.div>
  );
};

export default Historico;
