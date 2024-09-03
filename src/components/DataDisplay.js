// src/components/DataDisplay.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dados');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Dados do Banco de Dados</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nº de Integração</th>
            <th>Envolvido</th>
            <th>Processo Judicial</th>
            <th>Autor Falecido</th>
            <th>Petição Genérica?</th>
            <th>Dispensa Conciliação/Justiça Gratuita?</th>
            <th>Analfabeto?</th>
            <th>Testemunha 1</th>
            <th>Testemunha 2</th>
            <th>Comprovante ou Declaração</th>
            <th>Nome de Terceiro?</th>
            <th>Nome do Terceiro</th>
            <th>Número da Linha/Medidor/Hidrômetro</th>
            <th>Código do Cliente/Usuário/Matrícula</th>
            <th>Número do Contrato/Conta</th>
            <th>Número da Fatura/Nota Fiscal</th>
            <th>Código Débito Automático</th>
            <th>Status Processual</th>
            <th>Multa por Litigância de Má-fé?</th>
            <th>Decisões com Expedição de Ofício?</th>
            <th>Observações</th>
            <th>CPF/CNPJ</th>
            <th>Ajuizamento</th>
            <th>Subtipo de Ação</th>
            <th>Órgão Julgador</th>
            <th>Comarca</th>
            <th>UF</th>
            <th>Advogado da Parte</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.numero_de_integracao}</td>
              <td>{item.nome_autor}</td>
              <td>{item.numero_processo}</td>
              <td>{item.autor_falecido}</td>
              <td>{item.peticao_generica}</td>
              <td>{item.conciliacao_ou_justicagratuita}</td>
              <td>{item.analfabeto}</td>
              <td>{item.testemunha_1}</td>
              <td>{item.testemunha_2}</td>
              <td>{item.comprovante_declaracao}</td>
              <td>{item.existe_nome_terceiro}</td>
              <td>{item.nome_terceiro}</td>
              <td>{item.numero_medidor}</td>
              <td>{item.matricula_cliente}</td>
              <td>{item.numero_contrato}</td>
              <td>{item.numero_nota_fiscal}</td>
              <td>{item.numero_debito_automatico}</td>
              <td>{item.status_processual}</td>
              <td>{item.multa_ou_mafe}</td>
              <td>{item.oficio}</td>
              <td>{item.observacoes}</td>
              <td>{item.cpf_cnpj}</td>
              <td>{item.ajuizamento}</td>
              <td>{item.subtipo_acao}</td>
              <td>{item.orgao_julgador}</td>
              <td>{item.comarca}</td>
              <td>{item.uf}</td>
              <td>{item.advogado_da_parte}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataDisplay;
