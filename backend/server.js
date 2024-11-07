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
    console.log('Buscando dados da tabela rotinas_dados_tabela...');
    const result = await pool.query('SELECT * FROM public.rotinas_dados_tabela');
    console.log('Dados recebidos:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar dados do banco:', err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Ocorreu um erro no servidor', error: err.message });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://165.227.84.203:${port}`);
});

