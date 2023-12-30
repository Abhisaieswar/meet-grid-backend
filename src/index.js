require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const app = express();

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

const port = process.env.PORT || 4001;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
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

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
