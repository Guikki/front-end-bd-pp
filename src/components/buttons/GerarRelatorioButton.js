import React from 'react';
import { Button } from 'antd';

const GerarRelatorioButton = ({ onClick }) => (
  <Button type="default" onClick={onClick} style={{ marginBottom: '16px', marginLeft: '8px' }}>
    Gerar Relatório
  </Button>
);

export default GerarRelatorioButton;
