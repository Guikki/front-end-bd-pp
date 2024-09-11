import React from 'react';
import { Button } from 'antd';

const FiltroAvancadoButton = ({ onClick }) => (
  <Button type="primary" onClick={onClick} style={{ marginBottom: '16px' }}>
    Filtro Avançado
  </Button>
);

export default FiltroAvancadoButton;
