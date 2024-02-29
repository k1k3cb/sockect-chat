const { v4 } = require("uuid");

let allUsers = [];


const addUsers = (socket, io, username) => {
  socket.username = username;
  socket.color = generateRandomPastelColor();
  allUsers.push({
    id: socket.id,
    username: socket.username
  });
  io.emit('users', allUsers);
  console.log('allUsers', allUsers);
};

const disconnectUser = (socket, io) => {
  allUsers = allUsers.filter(user => user.id !== socket.id);
  console.log('cliente desconectado');
  io.emit('users', allUsers);
};

const newMessage = (socket, io, message) => {
  io.emit('message', {
    id: v4(),
    senderId: socket.id,
    username: socket.username,
    userMessage: message,
    color: socket.color
  });
};

const establishSocketConnection = (socket, io) => {
  console.log('Cliente conectado');

  if (!socket.username) {
    socket.emit('not user name');
  }
  socket.on('login', username => {
    addUsers(socket, io, username);
  });
  socket.on('message', message => {
    newMessage(socket, io, message);
  });

  newMessage(socket, io);

  io.emit('users', allUsers);

  socket.on('disconnect', () => disconnectUser(socket, io));
};

const generateRandomPastelColor = () => {
  // Componentes RGB en tonos pastel
  const r = Math.floor(Math.random() * 128);
  const g = Math.floor(Math.random() * 128);
  const b = Math.floor(Math.random() * 128);

  // Convertir a formato hexadecimal
  const color = `#${r.toString(16).padStart(2, '0')}${g
    .toString(16)
    .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

  return color;
};

module.exports = establishSocketConnection;
