import { useState } from "react";
import { useHistory } from "../context/HistoryContext";
import { motion } from "framer-motion";
import { FaTrash, FaUserPlus, FaClipboard, FaWhatsapp } from "react-icons/fa";
import { toast } from "react-toastify"; // Notificações Toastify

const Formulario = () => {
  const [participante, setParticipante] = useState("");
  const [participantes, setParticipantes] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const { addToHistory } = useHistory();

  // Adiciona um novo participante
  const adicionarParticipante = () => {
    if (!participante.trim()) return;
    if (participantes.includes(participante)) {
      toast.warning("Atenção! Nome já foi adicionado.");
      return;
    }
    setParticipantes([...participantes, participante]);
    setParticipante("");
    toast.success("Participante adicionado! 🎉");
  };

  // Remove um participante
  const removerParticipante = (nome) => {
    setParticipantes(participantes.filter((p) => p !== nome));
    toast.info(`${nome} foi removido.`);
  };

  // Realiza o sorteio de amigo secreto
  const sortear = () => {
    if (participantes.length < 2) {
      toast.error("É necessário pelo menos dois participantes!");
      return;
    }

    const shuffled = [...participantes].sort(() => Math.random() - 0.5);
    const pares = shuffled.map((p, i) => ({
      amigo: p,
      sorteado: shuffled[(i + 1) % shuffled.length],
    }));

    setResultado(pares);
    setModalAberto(true);
    addToHistory({ id: Date.now(), date: new Date().toLocaleString(), sorteio: pares });

    toast.success("Sorteio realizado com sucesso! 🎉");
  };

  // Copia o resultado para a área de transferência
  const copiarResultado = () => {
    if (resultado.length === 0) {
      toast.warning("Nenhum resultado para copiar!");
      return;
    }

    const texto = resultado.map(({ amigo, sorteado }) => `${amigo} → ${sorteado}`).join("\n");
    navigator.clipboard.writeText(texto).then(() => {
      toast.success("Resultado copiado para a área de transferência! 📋");
    });
  };

  // Compartilha o resultado pelo WhatsApp
  const compartilharWhatsApp = () => {
    if (resultado.length === 0) {
      toast.warning("Nenhum resultado para compartilhar!");
      return;
    }

    const texto = encodeURIComponent(
      "🎁 Sorteio de Amigo Secreto 🎉\n\n" +
      resultado.map(({ amigo, sorteado }) => `${amigo} → ${sorteado}`).join("\n")
    );

    const link = `https://wa.me/?text=${texto}`;
    window.open(link, "_blank");
  };

  return (
    <motion.div
      className="p-6 bg-white rounded shadow-lg max-w-lg mx-auto mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-center mb-4">🎁 Sorteio de Amigo Secreto</h2>

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

      {participantes.length > 0 && (
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
              <button
                onClick={() => removerParticipante(nome)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </motion.li>
          ))}
        </ul>
      )}

      <motion.button
        onClick={sortear}
        className="w-full bg-green-500 text-white p-3 rounded mt-4 hover:bg-green-600"
        whileHover={{ scale: 1.05 }}
      >
        🎲 Sortear!
      </motion.button>

      {/* MODAL DE RESULTADO */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            className="bg-white p-6 rounded shadow-lg max-w-md w-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-bold text-xl text-center mb-4">📜 Resultado do Sorteio</h3>
            <ul className="mb-4">
              {resultado.map(({ amigo, sorteado }, index) => (
                <li key={index} className="border-b py-2 text-center">
                  {amigo} → {sorteado}
                </li>
              ))}
            </ul>

            {/* Botões de Compartilhamento */}
            <motion.div className="flex gap-4 mt-4">
              <motion.button
                onClick={copiarResultado}
                className="bg-blue-500 text-white p-2 rounded flex-1"
                whileHover={{ scale: 1.05 }}
              >
                <FaClipboard /> Copiar
              </motion.button>

              <motion.button
                onClick={compartilharWhatsApp}
                className="bg-green-500 text-white p-2 rounded flex-1"
                whileHover={{ scale: 1.05 }}
              >
                <FaWhatsapp /> WhatsApp
              </motion.button>
            </motion.div>

            <button
              onClick={() => setModalAberto(false)}
              className="w-full bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600"
            >
              Fechar
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Formulario;
