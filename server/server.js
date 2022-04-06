const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("hello", "world");
  socket.on("play", (index) => {
    console.log("Received", index);
    socket.broadcast.emit("play", index);
  });
});

server.listen(8080);
console.log("Listening on port 8080");
