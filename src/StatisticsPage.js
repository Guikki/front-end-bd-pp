import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert } from 'antd';
import axios from 'axios';

const StatisticsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/statistics') // Atualize para a URL da sua API
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log do erro para depuração
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={`Request failed with status code ${error.response?.status}`} type="error" />;

  const columns = [
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Process',
      dataIndex: 'process',
      key: 'process',
    },
    // Adicione outras colunas conforme necessário
  ];

  return (
    <Table dataSource={data} columns={columns} rowKey="id" />
  );
};

export default StatisticsPage;
