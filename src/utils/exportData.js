import { toast } from "react-toastify";

export const exportToJson = (data) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "historico_sorteios.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toast.success("Histórico exportado como JSON!");
};

export const exportToCsv = (data) => {
  if (!data.length) return;

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Sorteio,Participante,Sorteado\n";

  data.forEach((sorteio, index) => {
    sorteio.forEach(({ amigo, sorteado }) => {
      csvContent += `${index + 1},${amigo},${sorteado}\n`;
    });
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.href = encodedUri;
  link.download = "historico_sorteios.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toast.success("Histórico exportado como CSV!");
};
