const express = require("express");
const cors = require("cors");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

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

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  //store hashed pwd in db and verify pwd
  const jwtToken = await jwt.sign({ userName }, "secret_key");
  res.json({ jwtToken });
});

app.get("/authenticate", (req, res) => {
  const jwtToken = req.headers["authorization"]?.split(" ")[1];

  if (jwtToken === undefined) {
    res.status(401);
    res.send("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "secret_key", async (error, payload) => {
      if (error) {
        res.status(401);
        res.send("Invalid Access Token");
      } else {
        res.status(200);
        res.send("Success");
      }
    });
  }
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
