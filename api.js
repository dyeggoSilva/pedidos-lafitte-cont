// Requisitos: express, body-parser e sqlite3
// Instale com: npm install express body-parser sqlite3

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const PORT = 3000;

const path = require('path'); // já deve estar lá
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco SQLite (cria o arquivo se não existir)
const db = new sqlite3.Database('./pedidos.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Conectado ao banco de dados SQLite.');
});

// Criar tabela se não existir
db.run(`CREATE TABLE IF NOT EXISTS pedidos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  telefone TEXT,
  os TEXT,
  produtos TEXT,
  dataPedido TEXT NOT NULL,
  dataPagamento TEXT,
  vendedor TEXT,
  valorPedido TEXT
)`);

// Rota: Criar pedido
app.post('/pedidos', (req, res) => {
  const { nome, telefone, os, produtos, dataPedido, dataPagamento, vendedor, valorPedido } = req.body;

  if (!nome || !dataPedido) {
    return res.status(400).json({ mensagem: 'Campos obrigatórios ausentes.' });
  }

  const sql = `INSERT INTO pedidos (nome, telefone, os, produtos, dataPedido, dataPagamento, vendedor, valorPedido)
               VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
  const params = [nome, telefone, os, produtos, dataPedido, dataPagamento, vendedor, valorPedido];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ mensagem: 'Erro ao inserir pedido.', erro: err.message });
    }
    res.status(201).json({ mensagem: 'Pedido criado com sucesso!', id: this.lastID });
  });
});

// Rota: Listar todos os pedidos
app.get('/pedidos', (req, res) => {
  db.all('SELECT * FROM pedidos', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ mensagem: 'Erro ao listar pedidos.', erro: err.message });
    }
    res.json(rows);
  });
});

// Rota: Listar pedidos por data (formato: "dd/mm/yyyy")
app.get('/pedidos/data/:data', (req, res) => {
  const dataBusca = req.params.data;

  db.all('SELECT * FROM pedidos WHERE dataPedido = ?', [dataBusca], (err, rows) => {
    if (err) {
      return res.status(500).json({ mensagem: 'Erro ao buscar pedidos por data.', erro: err.message });
    }
    res.json({ data: dataBusca, resultados: rows });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
