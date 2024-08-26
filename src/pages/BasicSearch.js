// src/pages/BasicSearch.js
import React from 'react';

const BasicSearch = ({ processNumber, filtered }) => {
  if (!filtered) {
    return <div>Por favor, insira um número de processo e clique em "Consultar".</div>;
  }

  return (
    <div>
      <h2>Resultados da Consulta Básica</h2>
      <p>Número do Processo: {processNumber}</p>
      {/* Exibir outros dados filtrados aqui */}
    </div>
  );
};

export default BasicSearch;
