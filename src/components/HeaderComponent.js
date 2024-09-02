import React from 'react';
import MenuComponent from './MenuComponent';
import LogoComponent from './LogoComponent';
import LogoutButton from './buttons/LogoutButton';

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
            <LogoComponent />
            <MenuComponent />
            <LogoutButton onClick={onLogout} />
        </header>
    );
};

export default HeaderComponent;
