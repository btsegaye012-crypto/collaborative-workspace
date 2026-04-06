import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
      socket.on('send-changes', (delta) => {
          socket.broadcast.emit('receive-changes', delta);
            });
            });

            const PORT = 5000;
            httpServer.listen(PORT, () => {
              console.log(`Server running on port ${PORT}`);
              });
              