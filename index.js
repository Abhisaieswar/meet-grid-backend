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

let activeUsersData = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log(`🔥: ${socket.id} user disconnected`);
    activeUsersData = activeUsersData.filter((user) => {
      return user.socketId !== socket.id;
    });
  });

  socket.on("addUser", (data) => {
    // const peerIds = activeUsersData.map((d) => d.peerIds);
    // io.to(data.socketId).emit("stream", peerIds);

    const userDetails = {
      name: data.name,
      socketId: data.socketId,
      // peerId: data.peerId,
    };

    activeUsersData.push(userDetails);
  });

  socket.on("chat message", (msg) => {
    const target = activeUsersData.filter((d) => d.name === msg.name);
    console.log("message: " + JSON.stringify(activeUsersData));
    socket.to(target[0].socketId).emit("msgResponse", msg.msg);
  });

  socket.on("addPeer", (data) => {
    const { roomId, peerId } = data;

    socket.join(roomId);
    socket.broadcast.emit("peerAdded", peerId);
  });
});

server.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
