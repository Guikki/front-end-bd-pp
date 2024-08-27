import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Input, Button, Spin, Upload, Table, message, Pagination } from 'antd';
import * as XLSX from 'xlsx';

const { Header, Content, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [processNumber, setProcessNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [lastUpdate, setLastUpdate] = useState('Nenhuma atualização');
  const [showLastUpdate, setShowLastUpdate] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
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
      setLastUpdate(new Date().toLocaleString()); // Update the last update time
      
      // Exibe a mensagem de sucesso com o nome do arquivo e a quantidade de registros carregados
      message.success(`${file.name} carregado com sucesso com ${jsonData.length} registros!`);
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

  useEffect(() => {
    setFilteredData(excelData); // Initial data load
  }, [excelData]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
  };

  const paginatedData = filteredData.slice(
    (pagination.current - 1) * pagination.pageSize,
    pagination.current * pagination.pageSize
  );

  const handleMenuClick = (key) => {
    if (key === 'sub3') {
      setShowLastUpdate(true);
    } else {
      setShowLastUpdate(false);
    }
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
          <Sider width={250} style={{ background: colorBgContainer, padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Input
                placeholder="Filtro de informação"
                value={processNumber}
                onChange={handleFilterChange}
                disabled={loading}
                style={{ marginBottom: '8px', width: '100%' }}
              />
              <Button 
                type="primary" 
                onClick={handleSearch} 
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : 'Consultar'}
              </Button>
            </div>
            <Upload
              beforeUpload={() => false}
              onChange={handleUpload}
              showUploadList={false}
              style={{ width: '100%' }}
            >
              <Button icon={<UploadOutlined />} style={{ width: '100%' }}>Upload Excel</Button>
            </Upload>
            <Menu 
              mode="inline" 
              defaultSelectedKeys={['sub1']} 
              style={{ height: '100%', borderRight: 0, marginTop: '16px' }}
              onClick={(e) => handleMenuClick(e.key)}
            >
              <Menu.Item key="sub1" icon={<UserOutlined />} disabled={!filteredData.length}>
                Autores
              </Menu.Item>
              <Menu.Item key="sub2" icon={<LaptopOutlined />} disabled={!filteredData.length}>
                Processos
              </Menu.Item>
              <Menu.Item key="sub3" icon={<NotificationOutlined />} disabled={!filteredData.length}>
                Detalhes
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                padding: 24,
                margin: '16px 0',
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {showLastUpdate && (
                <div style={{ marginBottom: '16px', textAlign: 'right' }}>
                  Última atualização: {lastUpdate}
                </div>
              )}
              <Table
                dataSource={paginatedData}
                columns={columns}
                rowKey={(record, index) => index}
                pagination={false}
                scroll={{ x: 'max-content' }}
              />
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={filteredData.length}
                onChange={handlePaginationChange}
                showSizeChanger
                onShowSizeChange={handlePaginationChange}
                style={{ marginTop: '16px' }}
              />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
