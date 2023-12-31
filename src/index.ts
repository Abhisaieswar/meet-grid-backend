import * as dotenv from "dotenv";
dotenv.config();

// const DbConnectionManager = require("./db/DbConnectionManager");

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

const port = process.env.PORT || 4001;

console.log({ port });

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// (async () => {
//   const dbManager = DbConnectionManager.getInstance();
//   const entityManager = await dbManager.getManager();
//   console.log(entityManager);
// })();

io.on("connection", (socket) => {
  socket.on("addPeer", (data) => {
    const { roomId, peerId } = data;

    socket.join(roomId);
    socket.broadcast.emit("peerAdded", peerId);
  });

  socket.on("removePeer", (data) => {
    const { roomId, peerId } = data;

    socket.leave(roomId);
    socket.broadcast.emit("peerRemoved", peerId);
  });

  socket.on("userAudioStatus", (data) => {
    socket.broadcast.emit("userAudioStatus", data);
  });

  socket.on("userVideoStatus", (data) => {
    socket.broadcast.emit("userVideoStatus", data);
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
