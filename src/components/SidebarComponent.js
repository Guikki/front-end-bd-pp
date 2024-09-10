import React from 'react';
import { Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

const { Sider } = Layout;

const SidebarComponent = ({ onMenuClick }) => {
  return (
    <Sider width={250} style={{ background: 'white', padding: '16px' }}>
      <Menu 
        mode="inline" 
        defaultSelectedKeys={['sub1']} 
        style={{ height: '100%', borderRight: 0, marginTop: '16px' }}
        onClick={(e) => onMenuClick(e.key)}
      >
        <Menu.Item key="sub1" icon={<UserOutlined />} disabled>
          Autores
        </Menu.Item>
        <Menu.Item key="sub2" icon={<LaptopOutlined />} disabled>
          Processos
        </Menu.Item>
        <Menu.Item key="sub3" icon={<NotificationOutlined />} disabled>
          Detalhes
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarComponent;
