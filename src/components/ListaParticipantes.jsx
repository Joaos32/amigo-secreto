const ListaParticipantes = ({ participantes }) => {
    return (
      <ul className="mt-4 border p-4 rounded">
        {participantes.length === 0 ? (
          <p>Nenhum participante adicionado ainda.</p>
        ) : (
          participantes.map((nome, index) => (
            <li key={index} className="border-b py-2">
              {nome}
            </li>
          ))
        )}
      </ul>
    );
  };
  
  export default ListaParticipantes;
  