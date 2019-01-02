const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", function(socket) {
  console.log("new user connected");

  socket.emit("newMessage", {
    from: "John",
    text: "See you then",
    createdAt: 123
  });

  socket.on("createMessage", message => {
    console.log("create Message", message);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
