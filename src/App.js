import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import BasicSearch from './pages/BasicSearch';
import FullSearch from './pages/FullSearch';

const { Header, Content, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
            >
              <Menu.Item key="sub1" icon={<UserOutlined />}>Autores</Menu.Item>
              <Menu.Item key="sub2" icon={<LaptopOutlined />}>Processos</Menu.Item>
              <Menu.Item key="sub3" icon={<NotificationOutlined />}>Detalhes</Menu.Item>
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
