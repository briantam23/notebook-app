const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
const cors = require('cors');
const io = socketIo(server);


const notebookRouter = require('./routes/notebooks');
const sketchRouter = require('./routes/sketches');

app.use(cors());
app.use(express.json());

app.use('/notebooks', notebookRouter);
app.use('/sketches', sketchRouter);

io.on('connection', (socket) => {
  console.log('Client connected.');

  socket.on('createNotebook', (notebook) => {
    io.emit('notebookCreated', notebook);
  });

  socket.on('updateNotebook', (notebook) => {
    io.emit('notebookUpdated', notebook);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected.');
  });
});
