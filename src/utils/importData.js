import { toast } from "react-toastify";

export const importFromJson = (event, setHistory) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      setHistory(data);
      toast.success("Histórico importado com sucesso!");
    } catch (error) {
      toast.error("Erro ao importar JSON. Verifique o arquivo.");
    }
  };
  reader.readAsText(file);
};

export const importFromCsv = (event, setHistory) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target.result;
    const lines = text.split("\n").slice(1); // Remove cabeçalho
    const sorteios = [];
    let currentSorteio = [];
    let lastIndex = 1;

    lines.forEach((line) => {
      const [index, amigo, sorteado] = line.split(",");
      if (!index || !amigo || !sorteado) return;

      const sorteioIndex = parseInt(index.trim());
      if (sorteioIndex !== lastIndex) {
        sorteios.push(currentSorteio);
        currentSorteio = [];
        lastIndex = sorteioIndex;
      }
      currentSorteio.push({ amigo: amigo.trim(), sorteado: sorteado.trim() });
    });

    if (currentSorteio.length > 0) sorteios.push(currentSorteio);
    setHistory(sorteios);
    toast.success("Histórico CSV importado com sucesso!");
  };

  reader.readAsText(file);
};
