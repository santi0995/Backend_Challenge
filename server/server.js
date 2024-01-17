import { Server } from "socket.io";
import __dirname from "./utils.js";
import { createServer } from "http";
import { engine } from "express-handlebars";
import errorHandler from "./src/middlewares/errorhandler.mid.js";
import express from "express";
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathhandler.mid.js";
import product from "./src/data/fs/ProductManager.fs.js";
import router from "./src/routers/index.router.js";
import user from "./src/data/fs/UserManager.fs.js";

const server = express();
const PORT = 8080;
const cbReady = console.log("server ready on port " + PORT);
// server.listen(PORT, cbReady);

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, cbReady);

socketServer.on("connection", (socket) => {
  console.log("connected id:" +socket.id);
  socket.emit("products", product.read())
  socket.on("new product", async (data) => {
    try {
      await product.create(data);
      socket.emit("products", product.read())
    } catch (error) {
        console.log(error);
    }
  });
  
  // socket.on("new user", async (data) => {
  //   try {
  //     await user.create(data);
  //     socket.emit("new sucess", "well done!")
  //   } catch (error) {
  //       console.log(error);
  //   }
  // });
});

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
