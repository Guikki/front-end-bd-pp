import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const LogoutButton = ({ onClick }) => (
    <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={onClick}
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
);

export default LogoutButton;
