var socket = io();
socket.on("connect", function() {
  console.log("connected to server");
  socket.emit("createMessage", {
    from: "Andrew@net.com",
    text: "This is a working"
  });
});
socket.on("disconnect", function() {
  console.log("disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("New Message received", message);
});
