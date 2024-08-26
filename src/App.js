import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Button, Checkbox, Row, Col, Spin, Upload, Table, message } from 'antd';
import * as XLSX from 'xlsx';
import BasicSearch from './pages/BasicSearch';
import FullSearch from './pages/FullSearch';

const { Header, Content, Sider } = Layout;

const Filters = ({ filters, setFilters }) => {
  const handleCheckboxChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
      <h3>Filtros</h3>
      <Row gutter={[16, 16]}>
        {Object.keys(filters).map((filterKey) => (
          <Col span={8} key={filterKey}>
            <Checkbox
              checked={filters[filterKey]}
              onChange={() => handleCheckboxChange(filterKey)}
            >
              {filterKey}
            </Checkbox>
          </Col>
        ))}
      </Row>
    </div>
  );
};

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [processNumber, setProcessNumber] = useState('');
  const [filtered, setFiltered] = useState(false);
  const [filters, setFilters] = useState({
    'Nº DE INTEGRAÇÃO': false,
    'ENVOLVIDO': false,
    'PROCESSO_JUDICIAL': false,
    'AUTOR FALECIDO': false,
    'PETIÇÃO GENÉRICA?': false,
    'DISPENSA CONCILIAÇÃO E/OU PEDE JUSTIÇA GRATUITA?': false,
    'ANALFABETO? (ASSINADO COM DEDO?)': false,
    'SE ANALFABETO: TESTEMUNHA 1 (PROCURAÇÃO E/OU DECLARAÇÃO)': false,
    'SE ANALFABETO: TESTEMUNHA 2 (PROCURAÇÃO E/OU DECLARAÇÃO)': false,
    'COMPROVANTE OU DECLARAÇÃO': false,
    'HÁ DECISÕES COM EXPEDIÇÃO DE OFÍCIO?': false,
    'OBSERVAÇÕES': false,
    'CPF_CNPJ': false,
    'AJUIZAMENTO': false,
    'SUBTIPO_ACAO': false,
    'ORGAO_JULGADOR': false,
    'COMARCA': false,
    'UF': false,
    'ADVOGADO_PARTE': false,
    'ANÁLISE': false,
  });

  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setFiltered(true);
      setLoading(false);
    }, 2000);
  };

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
      setFilteredData(jsonData); // Initialize filtered data
      message.success('Dados carregados com sucesso!');
    };
    reader.readAsArrayBuffer(file);
  };

  const columns = excelData.length > 0
    ? Object.keys(excelData[0]).map((key) => ({
        title: key,
        dataIndex: key,
        key: key,
      }))
    : [];

  const handleFilterChange = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    setProcessNumber(value);

    if (value) {
      const filtered = excelData.filter(row =>
        Object.values(row).some(val =>
          val?.toString().toLowerCase().includes(value)
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(excelData);
    }
  }, [excelData]);

  return (
    <Router>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1, minWidth: 0 }}>
            <Menu.Item key="1">
              <Link to="/">Consulta Básica</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/full">Consulta Completa</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <div style={{ padding: '16px' }}>
              <Input
                placeholder="Filtro de informação"
                value={processNumber}
                onChange={handleFilterChange}
                disabled={loading}
              />
              <Button 
                type="primary" 
                onClick={handleSearch} 
                style={{ marginTop: '8px' }}
                disabled={loading}
              >
                {loading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : 'Consultar'}
              </Button>
            </div>
            <Upload
              beforeUpload={() => false}
              onChange={handleUpload}
              showUploadList={false}
              
            >
              <Button icon={<UploadOutlined />}>Upload Excel</Button>
            </Upload>
            <Menu mode="inline" defaultSelectedKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
              <Menu.Item key="sub1" icon={<UserOutlined />} disabled={!filtered}>
                Autores
              </Menu.Item>
              <Menu.Item key="sub2" icon={<LaptopOutlined />} disabled={!filtered}>
                Processos
              </Menu.Item>
              <Menu.Item key="sub3" icon={<NotificationOutlined />} disabled={!filtered}>
                Detalhes
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>

            <Button
              type="default"
              onClick={() => setShowFilters(!showFilters)}
              style={{ margin: '16px 0' }}
            >
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>

            {showFilters && <Filters filters={filters} setFilters={setFilters} />}

            <Content
              style={{
                padding: 24,
                margin: '16px 0',
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Table
                dataSource={filteredData}
                columns={columns}
                rowKey={(record, index) => index}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
