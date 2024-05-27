const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const path = require("path");
const io = require("socket.io")(server);
dotenv.config();
const bodyParser = require("body-parser");
// For uploading multimedia files
const fileUpload = require("express-fileupload");

app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./Src/Public")));

/*Socket.io*/
io.on("connection", (socket) => {
  /*message: client message*/
  socket.on("message", (message) => {
    /*Send msg to all users*/
    io.emit("message", message);
  });
});

require("./Db/connection");
const port = process.env.PORT;

const v1Routes = require("./Src/routes/v1/routes");

app.use("/api", v1Routes);
app.get("/", (req, res) => {
  return res.sendFile("/Public/index.html");
});
server.listen(4000, console.log("socket server listen at 4000"));

app.listen(
  port,
  console.log(` application listening at http://localhost:${port}`)
);
