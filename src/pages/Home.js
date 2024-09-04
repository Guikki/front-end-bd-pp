import React, { useState, useCallback, useEffect } from 'react';
import { Layout, Breadcrumb, message } from 'antd';
import * as XLSX from 'xlsx';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent';
import SidebarComponent from '../components/SidebarComponent';
import DataDisplay from '../components/DataDisplay';
import { theme } from 'antd'; // Importando theme do Ant Design

const { Content } = Layout;

const Home = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken(); // Usando o theme para acessar tokens

  const [processNumber, setProcessNumber] = useState('');
  const [excelData, setExcelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('Nenhuma atualização');
  const [showLastUpdate, setShowLastUpdate] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const consultaGeral = location.pathname === '/full';

  const handleUpload = ({ file }) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
      setFilteredData(jsonData);
      setLastUpdate(new Date().toLocaleString());
      
      message.success(`${file.name} carregado com sucesso com ${jsonData.length} registros!`);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleFilterChange = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    setProcessNumber(value);

    let filtered;

    if (consultaGeral) {
      filtered = excelData;
    } else {
      filtered = excelData.filter(row =>
        Object.values(row).some(val =>
          val?.toString().toLowerCase().includes(value)
        )
      );
    }

    setFilteredData(filtered);

  }, [excelData, consultaGeral]);

  useEffect(() => {
    setFilteredData(excelData);
  }, [excelData]);

  const handleMenuClick = (key) => {
    if (key === 'sub3') {
      setShowLastUpdate(true);
    } else {
      setShowLastUpdate(false);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <Layout>
      <HeaderComponent onLogout={handleLogout} />
      <Layout>
        <SidebarComponent
          processNumber={processNumber}
          onFilterChange={handleFilterChange}
          onUpload={handleUpload}
          showLastUpdate={false} // Não mostrar atualização na Sidebar
          onMenuClick={handleMenuClick}
        />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>

          <Content
            style={{
              position: 'relative',
              padding: 24,
              margin: '16px 0',
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: borderRadiusLG,
                background: `linear-gradient(transparent, rgba(0, 0, 0, 0.05))`,
                pointerEvents: 'none',
                transform: 'scaleY(-1)',
                opacity: 0.5,
              }}
            />
            
            {showLastUpdate && (
              <div style={{ marginBottom: '16px' }}>
                Última atualização do banco de dados: {lastUpdate}
              </div>
            )}
            <DataDisplay filteredData={filteredData} /> {/* Passando o filteredData para o DataDisplay */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
