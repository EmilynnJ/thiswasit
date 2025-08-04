const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*", // Adjust for production
      methods: ["GET", "POST"]
    }
  });

  // Signaling logic
  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).emit('user-connected', userId);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    socket.on('offer', (roomId, offer) => {
      socket.to(roomId).emit('offer', offer);
      console.log(`Offer sent in room ${roomId}`);
    });

    socket.on('answer', (roomId, answer) => {
      socket.to(roomId).emit('answer', answer);
      console.log(`Answer sent in room ${roomId}`);
    });

    socket.on('ice-candidate', (roomId, candidate) => {
      socket.to(roomId).emit('ice-candidate', candidate);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
      // Here you might want to emit an event to the room to notify other users
    });
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
