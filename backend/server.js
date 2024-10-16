const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuração do banco de dados PostgreSQL (atualizada)
const pool = new Pool({
  host: '165.227.84.203',
  user: 'u_app_pp',
  password: 'X7NaDPdnsC0dyvu0',
  database: 'hectum',
  port: 5432,  // Certifique-se de que essa é a porta correta
});

app.use(cors());
app.use(express.json());

// Rota para obter dados do banco
app.get('/api/dados', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sua_tabela_aqui');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar dados:', err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
