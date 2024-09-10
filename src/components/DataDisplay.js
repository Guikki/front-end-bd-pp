import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Pagination, Spin, Input, Modal, Checkbox, Button } from 'antd';

const DataDisplay = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [capsLockOn, setCapsLockOn] = useState(false);
  
  // Estados para o modal de Filtro Avançado
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dados');
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterText(value);
    const filtered = data.filter(item =>
      Object.values(item).some(val =>
        String(val).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };

  const handleCapsLockCheck = (e) => {
    const isCapsLockOn = e.getModifierState && e.getModifierState('CapsLock');
    setCapsLockOn(isCapsLockOn);
  };

  const handlePaginationChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Colunas disponíveis para o filtro
  const columnsOptions = [
    { label: 'Nº de Integração', value: 'numero_de_integracao' },
    { label: 'Envolvido', value: 'nome_autor' },
    { label: 'Processo Judicial', value: 'numero_processo' },
    { label: 'Autor Falecido', value: 'autor_falecido' },
    { label: 'Petição Genérica?', value: 'peticao_generica' },
    { label: 'Dispensa Conciliação/Justiça Gratuita?', value: 'conciliacao_ou_justicagratuita' },
    { label: 'Analfabeto?', value: 'analfabeto' },
    { label: 'Testemunha 1', value: 'testemunha_1' },
    { label: 'Testemunha 2', value: 'testemunha_2' },
    { label: 'Comprovante ou Declaração', value: 'comprovante_declaracao' },
    { label: 'Nome de Terceiro?', value: 'existe_nome_terceiro' },
    { label: 'Nome do Terceiro', value: 'nome_terceiro' },
    { label: 'Número da Linha/Medidor/Hidrômetro', value: 'numero_medidor' },
    { label: 'Código do Cliente/Usuário/Matrícula', value: 'matricula_cliente' },
    { label: 'Número do Contrato/Conta', value: 'numero_contrato' },
    { label: 'Número da Fatura/Nota Fiscal', value: 'numero_nota_fiscal' },
    { label: 'Código Débito Automático', value: 'numero_debito_automatico' },
    { label: 'Status Processual', value: 'status_processual' },
    { label: 'Multa por Litigância de Má-fé?', value: 'multa_ou_mafe' },
    { label: 'Decisões com Expedição de Ofício?', value: 'oficio' },
    { label: 'Observações', value: 'observacoes' },
    { label: 'CPF/CNPJ', value: 'cpf_cnpj' },
    { label: 'Ajuizamento', value: 'ajuizamento' },
    { label: 'Subtipo de Ação', value: 'subtipo_acao' },
    { label: 'Órgão Julgador', value: 'orgao_julgador' },
    { label: 'Comarca', value: 'comarca' },
    { label: 'UF', value: 'uf' },
    { label: 'Advogado da Parte', value: 'advogado_da_parte' },
  ];

  const handleCheckboxChange = (checkedValues) => {
    setSelectedColumns(checkedValues);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleApplyFilters = () => {
    // Fechar o modal ao aplicar filtros
    setIsModalVisible(false);
  };

  // Filtrar colunas selecionadas
  const filteredColumns = columnsOptions.filter(column => 
    selectedColumns.includes(column.value)
  ).map(col => ({
    title: col.label,
    dataIndex: col.value,
    key: col.value
  }));

  if (loading) return <Spin size="large" />;

  return (
    <div>
      <h1>Dados do Banco de Dados</h1>

      {/* Campo de Filtro Rápido */}
      <Input
        placeholder="Filtrar dados..."
        value={filterText}
        onChange={handleFilterChange}
        onKeyUp={handleCapsLockCheck}
        style={{ marginBottom: '16px' }}
      />

      {/* Botão para abrir o modal de Filtro Avançado */}
      <Button type="primary" onClick={showModal} style={{ marginBottom: '16px' }}>
        Filtro Avançado
      </Button>

      {/* Modal para selecionar colunas */}
      <Modal
        title="Filtros Avançados"
        visible={isModalVisible}
        onOk={handleApplyFilters}
        onCancel={handleCancel}
      >
        <Checkbox.Group
          options={columnsOptions}
          onChange={handleCheckboxChange}
          value={selectedColumns}
        />
      </Modal>

      {/* Tabela de Dados */}
      <div style={{ overflowX: 'auto' }}>
        <Table
          dataSource={paginatedData}
          columns={filteredColumns.length ? filteredColumns : columnsOptions.map(col => ({
            title: col.label,
            dataIndex: col.value,
            key: col.value
          }))}
          pagination={false} 
          scroll={{ x: 'max-content' }} 
        />
      </div>

      {/* Paginação */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onChange={handlePaginationChange}
        showSizeChanger
      />
    </div>
  );
};

export default DataDisplay;
