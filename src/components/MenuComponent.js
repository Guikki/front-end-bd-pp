import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const MenuComponent = () => (
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
);

export default MenuComponent;
