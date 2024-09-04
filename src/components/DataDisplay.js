import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Spin } from 'antd';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nº de Integração', dataIndex: 'numero_de_integracao', key: 'numero_de_integracao' },
    { title: 'Envolvido', dataIndex: 'nome_autor', key: 'nome_autor' },
    { title: 'Processo Judicial', dataIndex: 'numero_processo', key: 'numero_processo' },
    { title: 'Autor Falecido', dataIndex: 'autor_falecido', key: 'autor_falecido' },
    { title: 'Petição Genérica?', dataIndex: 'peticao_generica', key: 'peticao_generica' },
    { title: 'Dispensa Conciliação/Justiça Gratuita?', dataIndex: 'conciliacao_ou_justicagratuita', key: 'conciliacao_ou_justicagratuita' },
    { title: 'Analfabeto?', dataIndex: 'analfabeto', key: 'analfabeto' },
    { title: 'Testemunha 1', dataIndex: 'testemunha_1', key: 'testemunha_1' },
    { title: 'Testemunha 2', dataIndex: 'testemunha_2', key: 'testemunha_2' },
    { title: 'Comprovante ou Declaração', dataIndex: 'comprovante_declaracao', key: 'comprovante_declaracao' },
    { title: 'Nome de Terceiro?', dataIndex: 'existe_nome_terceiro', key: 'existe_nome_terceiro' },
    { title: 'Nome do Terceiro', dataIndex: 'nome_terceiro', key: 'nome_terceiro' },
    { title: 'Número da Linha/Medidor/Hidrômetro', dataIndex: 'numero_medidor', key: 'numero_medidor' },
    { title: 'Código do Cliente/Usuário/Matrícula', dataIndex: 'matricula_cliente', key: 'matricula_cliente' },
    { title: 'Número do Contrato/Conta', dataIndex: 'numero_contrato', key: 'numero_contrato' },
    { title: 'Número da Fatura/Nota Fiscal', dataIndex: 'numero_nota_fiscal', key: 'numero_nota_fiscal' },
    { title: 'Código Débito Automático', dataIndex: 'numero_debito_automatico', key: 'numero_debito_automatico' },
    { title: 'Status Processual', dataIndex: 'status_processual', key: 'status_processual' },
    { title: 'Multa por Litigância de Má-fé?', dataIndex: 'multa_ou_mafe', key: 'multa_ou_mafe' },
    { title: 'Decisões com Expedição de Ofício?', dataIndex: 'oficio', key: 'oficio' },
    { title: 'Observações', dataIndex: 'observacoes', key: 'observacoes' },
    { title: 'CPF/CNPJ', dataIndex: 'cpf_cnpj', key: 'cpf_cnpj' },
    { title: 'Ajuizamento', dataIndex: 'ajuizamento', key: 'ajuizamento' },
    { title: 'Subtipo de Ação', dataIndex: 'subtipo_acao', key: 'subtipo_acao' },
    { title: 'Órgão Julgador', dataIndex: 'orgao_julgador', key: 'orgao_julgador' },
    { title: 'Comarca', dataIndex: 'comarca', key: 'comarca' },
    { title: 'UF', dataIndex: 'uf', key: 'uf' },
    { title: 'Advogado da Parte', dataIndex: 'advogado_da_parte', key: 'advogado_da_parte' },
  ];

  if (loading) return <Spin size="large" />;

  return (
    <div>
      <h1>Dados do Banco de Dados</h1>
      <div style={{ overflowX: 'auto' }}>
        <Table
          dataSource={paginatedData}
          columns={columns}
          pagination={false} // Desabilitar a paginação do Ant Design
          scroll={{ x: 'max-content' }} // Habilitar rolagem horizontal
        />
      </div>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePaginationChange}
        showSizeChanger
      />
    </div>
  );
};

export default DataDisplay;
