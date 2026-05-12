const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("client connected");

  socket.on("publish_message", (payload) => {
    io.emit("news_update", payload);
  });
});

server.listen(3001, () => {
  console.log("Socket demo listening on http://localhost:3001");
});
