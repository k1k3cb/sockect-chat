let allUsers = [];
let messages = [];

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

const newMessage = (socket, io) => {
  socket.on('message', message => {
    messages.push({
      id: socket.id,
      username: socket.username,
      userMessage: message,
      color: socket.color
    });
    io.emit('message', messages);
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
