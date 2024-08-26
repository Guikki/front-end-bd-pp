// src/pages/FullSearch.js
import React from 'react';

const FullSearch = ({ processNumber, filtered }) => {
  if (!filtered) {
    return <div>Por favor, insira um número de processo e clique em "Consultar".</div>;
  }

  return (
    <div>
      <h2>Resultados da Consulta Completa</h2>
      <p>Número do Processo: {processNumber}</p>
      {/* Exibir outros dados filtrados aqui */}
    </div>
  );
};

export default FullSearch;
