const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 5000;

// Configuração do pool do banco de dados PostgreSQL
const pool = new Pool({
  host: '165.227.84.203',
  user: 'u_app_pp',
  password: 'X7NaDPdnsC0dyvu0',
  database: 'hectum',
  port: 5432,
});

// Middleware para habilitar CORS
app.use(cors());

// Rota para buscar dados do banco
app.get('/api/dados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM intelpepe'); // Troque 'sua_tabela' pelo nome da tabela desejada
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).send('Erro ao buscar dados');
  }
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
