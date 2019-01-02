const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const { generateMessage, generateLocationMessage } = require("./utils/message");
const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", function(socket) {
  console.log("new user connected");

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat room")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", (message, callback) => {
    console.log("create Message", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("This is from the server");
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is up at port ${port}`);
});
