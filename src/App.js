import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined, LoadingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Button, Checkbox, Row, Col, Spin } from 'antd';
import BasicSearch from './pages/BasicSearch';
import FullSearch from './pages/FullSearch';

const { Header, Content, Sider } = Layout;

// Component to handle filters
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

  const handleSearch = () => {
    setLoading(true);
    
    // Simulando a consulta
    setTimeout(() => {
      setFiltered(true);
      setLoading(false);
    }, 2000);
  };

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
                placeholder="Número do processo"
                value={processNumber}
                onChange={(e) => setProcessNumber(e.target.value)}
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

            {/* Toggle Filters Button */}
            <Button
              type="default"
              onClick={() => setShowFilters(!showFilters)}
              style={{ margin: '16px 0' }}
            >
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>

            {/* Filters Section */}
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
              <Routes>
                <Route path="/" element={<BasicSearch processNumber={processNumber} filtered={filtered} />} />
                <Route path="/full" element={<FullSearch processNumber={processNumber} filtered={filtered} />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
