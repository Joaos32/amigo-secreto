export const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("AmigoSecretoDB", 1);
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("participantes")) {
          db.createObjectStore("participantes", { keyPath: "id", autoIncrement: true });
        }
      };
  
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  };
  
  export const addParticipante = async (nome) => {
    const db = await openDB();
    const tx = db.transaction("participantes", "readwrite");
    const store = tx.objectStore("participantes");
    store.add({ nome });
    return tx.complete;
  };
  
  export const getParticipantes = async () => {
    const db = await openDB();
    const tx = db.transaction("participantes", "readonly");
    const store = tx.objectStore("participantes");
    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
    });
  };
  