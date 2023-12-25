const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

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

server.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
