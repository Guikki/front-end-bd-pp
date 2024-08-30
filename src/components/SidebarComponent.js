import React from 'react';
import { Input, Button, Upload, Menu, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined, UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout } from 'antd'; // Importando Layout do Ant Design
const { Sider } = Layout; // Desestruturando Sider de Layout

const SidebarComponent = ({ processNumber, onFilterChange, onUpload, showLastUpdate, onMenuClick }) => {
  return (
    <Sider width={250} style={{ background: 'white', padding: '16px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Filtro de informação"
          value={processNumber}
          onChange={onFilterChange}
          style={{ marginBottom: '8px', width: '100%' }}
        />
        <Button 
          type="primary" 
          onClick={onFilterChange} 
          style={{ width: '100%' }}
        >
          {showLastUpdate ? <Spin indicator={<LoadingOutlined spin />} size="small" /> : 'Consultar'}
        </Button>
      </div>
      <Upload
        beforeUpload={() => false}
        onChange={onUpload}
        showUploadList={false}
        style={{ width: '100%' }}
      >
        <Button icon={<UploadOutlined />} style={{ width: '100%' }}>Upload Excel</Button>
      </Upload>
      <Menu 
        mode="inline" 
        defaultSelectedKeys={['sub1']} 
        style={{ height: '100%', borderRight: 0, marginTop: '16px' }}
        onClick={(e) => onMenuClick(e.key)}
      >
        <Menu.Item key="sub1" icon={<UserOutlined />} disabled={!showLastUpdate}>
          Autores
        </Menu.Item>
        <Menu.Item key="sub2" icon={<LaptopOutlined />} disabled={!showLastUpdate}>
          Processos
        </Menu.Item>
        <Menu.Item key="sub3" icon={<NotificationOutlined />} disabled={!showLastUpdate}>
          Detalhes
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarComponent;