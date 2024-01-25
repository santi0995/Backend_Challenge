
import { Server } from "socket.io";
import __dirname from "./utils.js";
import { createServer } from "http";

import { engine } from "express-handlebars";
import errorHandler from "./src/middlewares/errorhandler.mid.js";
import express from "express";
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathhandler.mid.js";
import router from "./src/routers/index.router.js";
import socketUtils from "./src/utils/socket.utils.js";


const server = express();
const PORT = 8080;
const cbReady = console.log("server ready on port " + PORT);


const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, cbReady);


socketServer.on("connection", socketUtils);

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

export {socketServer}

