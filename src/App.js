import React from 'react';
import { Layout, Menu, Breadcrumb, Typography, Card, Col, Row } from 'antd';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';
import StatisticsPage from './StatisticsPage'; // Vamos criar esse arquivo a seguir

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
        <Menu.Item key="2" icon={<InfoCircleOutlined />}>About</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Statistics</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Statistics" bordered={false}>
              <StatisticsPage />
            </Card>
          </Col>
        </Row>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>©2024 Your Company</Footer>
  </Layout>
);

export default App;
