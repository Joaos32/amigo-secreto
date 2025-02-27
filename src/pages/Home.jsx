import { useState } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaUserPlus } from "react-icons/fa";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [participante, setParticipante] = useState("");
  const [participantes, setParticipantes] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const adicionarParticipante = () => {
    if (!participante.trim()) return;
    if (participantes.includes(participante)) return;
    setParticipantes([...participantes, participante]);
    setParticipante("");
  };

  const removerParticipante = (nome) => {
    setParticipantes(participantes.filter((p) => p !== nome));
  };

  const sortear = () => {
    if (participantes.length < 2) return;
    const shuffled = [...participantes].sort(() => Math.random() - 0.5);
    const pares = shuffled.map((p, i) => ({
      amigo: p,
      sorteado: shuffled[(i + 1) % shuffled.length],
    }));
    setResultado(pares);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-6">
      {showConfetti && <Confetti width={width} height={height} />}

      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎁 Amigo Secreto</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nome do participante"
            value={participante}
            onChange={(e) => setParticipante(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <motion.button
            onClick={adicionarParticipante}
            className="bg-blue-500 text-white p-2 rounded flex items-center gap-2 hover:bg-blue-600"
            whileHover={{ scale: 1.05 }}
          >
            <FaUserPlus /> Adicionar
          </motion.button>
        </div>

        <ul className="space-y-2 mb-4">
          {participantes.map((nome, index) => (
            <motion.li
              key={index}
              className="border p-2 flex justify-between items-center rounded bg-gray-50 shadow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {nome}
              <button onClick={() => removerParticipante(nome)} className="text-red-500 hover:text-red-700">
                <FaTrash />
              </button>
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={sortear}
          className="w-full bg-green-500 text-white p-3 rounded mt-4 hover:bg-green-600"
          whileHover={{ scale: 1.05 }}
        >
          🎲 Sortear!
        </motion.button>

        {resultado.length > 0 && (
          <motion.div
            className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold mb-2">📜 Resultado</h3>
            <ul>
              {resultado.map(({ amigo, sorteado }, index) => (
                <li key={index} className="border-b py-2">
                  {amigo} → {sorteado}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Botão para histórico */}
      <motion.button
        onClick={() => navigate("/historico")}
        className="mt-6 bg-gray-500 text-white p-3 rounded hover:bg-gray-600"
        whileHover={{ scale: 1.05 }}
      >
        📜 Ver Histórico
      </motion.button>
    </div>
  );
};

export default Home;
