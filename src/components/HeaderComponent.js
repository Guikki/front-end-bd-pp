import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import LogoutButton from "./buttons/LogoutButton";

const HeaderComponent = ({ onLogout }) => {
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
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <LogoutButton onClick={onLogout} />
        </header>
    );
};

export default HeaderComponent;
