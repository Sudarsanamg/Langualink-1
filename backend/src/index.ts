import { Socket } from "socket.io";
import http from "http";
import express from 'express';
import { Server } from 'socket.io';
import { UserManager } from "./managers/UserManger";

const app = express();
const server = http.createServer(app); // ✅ Pass `app`, not `http`

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  
  socket.on("user-info", (name: string, language: string) => {
    userManager.addUser(name, socket, language);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    userManager.removeUser(socket.id);
  });
});

server.listen(3000, "0.0.0.0", () => {
  console.log('Listening on *:3000');
});
