// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Banco de dados SQLite
const db = new sqlite3.Database('./chat.db');

// Cria a tabela de mensagens, caso não exista
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, message TEXT)');
});

// Serve os arquivos estáticos da aplicação React
app.use(express.static('build'));

// Conectando clientes ao servidor
io.on('connection', (socket) => {
  console.log('Novo cliente conectado!');

  // Carrega todas as mensagens do banco de dados quando um cliente se conecta
  db.all('SELECT * FROM messages ORDER BY id ASC', [], (err, rows) => {
    if (err) {
      throw err;
    }
    // Envia as mensagens para o cliente
    socket.emit('load-messages', rows);
  });

  // Recebe mensagem do cliente e salva no banco de dados
  socket.on('send-message', (message) => {
    console.log('Mensagem recebida:', message);

    // Salva a mensagem no banco de dados
    db.run('INSERT INTO messages (name, message) VALUES (?, ?)', [message.name, message.message], function (err) {
      if (err) {
        throw err;
      }
      // Envia a nova mensagem para todos os clientes conectados
      io.emit('receive-message', { id: this.lastID, ...message });
    });
  });

  // Quando o cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Inicia o servidor na porta 3001
server.listen(3001, () => {
  console.log('Servidor Socket.IO rodando na porta 3001');
});
