import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Button } from 'antd';
import BasicSearch from './pages/BasicSearch';
import FullSearch from './pages/FullSearch';

const { Header, Content, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [processNumber, setProcessNumber] = useState('');
  const [filtered, setFiltered] = useState(false);

  const handleSearch = () => {
    // Set filtered to true to simulate filtering
    setFiltered(true);
  };

  return (
    <Router>
      <Layout>
        <Header
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <Menu.Item key="1">
              <Link to="/">Consulta Básica</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/full">Consulta Completa</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            width={200}
            style={{
              background: colorBgContainer,
            }}
          >
            <div style={{ padding: '16px' }}>
              <Input 
                placeholder="Número do processo" 
                value={processNumber}
                onChange={(e) => setProcessNumber(e.target.value)}
              />
              <Button 
                type="primary" 
                onClick={handleSearch}
                style={{ marginTop: '8px' }}
              >
                Consultar
              </Button>
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
            >
              <Menu.Item key="sub1" icon={<UserOutlined />} disabled={!filtered}>Autores</Menu.Item>
              <Menu.Item key="sub2" icon={<LaptopOutlined />} disabled={!filtered}>Processos</Menu.Item>
              <Menu.Item key="sub3" icon={<NotificationOutlined />} disabled={!filtered}>Detalhes</Menu.Item>
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: '0 24px 24px',
            }}
          >
            <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/" element={<BasicSearch />} />
                <Route path="/full" element={<FullSearch />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
