import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("history");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const addToHistory = (sorteio) => {
    const newEntry = {
      id: Date.now(), // ID único
      date: new Date().toLocaleString(), // Data formatada
      sorteio,
    };
    setHistory((prevHistory) => [...prevHistory, newEntry]);
  };

  const removeFromHistory = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esse sorteio?")) {
      setHistory(history.filter((entry) => entry.id !== id));
      toast.info("Sorteio removido!");
    }
  };

  const clearHistory = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico?")) {
      setHistory([]);
      localStorage.removeItem("history");
      toast.info("Histórico apagado!");
    }
  };

  return (
    <HistoryContext.Provider value={{ history, addToHistory, removeFromHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
