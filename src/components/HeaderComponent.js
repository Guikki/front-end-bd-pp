import React from 'react';
import { Menu, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const HeaderComponent = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      width: '100%', 
      height: '64px', 
      background: '#001529', 
      padding: '0 20px', 
      boxSizing: 'border-box' 
    }}>
      <div className="demo-logo" style={{ color: 'white', fontSize: '20px' }}>
        

      </div>
      <Menu 
        theme="dark" 
        mode="horizontal" 
        defaultSelectedKeys={['1']} 
        style={{ flex: 1, minWidth: 0, lineHeight: '64px' }}
      >
        <Menu.Item key="1">
          <Link to="/home">Consulta Básica</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/full">Consulta Geral</Link>
        </Menu.Item>
      </Menu>
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={onLogout}
        style={{
          color: 'white',
          background: 'transparent',
          border: 'none',
          fontSize: '16px',
          marginLeft: '16px',
          lineHeight: '64px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.4)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.2)'}
        onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.80)'}
        onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Logout
      </Button>
    </header>
  );
};

export default HeaderComponent;
