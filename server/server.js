import "dotenv/config.js";

import IndexRouter from './src/routers/index.router.js'
import MongoStore from "connect-mongo";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import dbConnection from "./src/utils/db.js";
import { engine } from "express-handlebars";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import express from "express";
import expressSession from "express-session"
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathhandler.mid.js";
import sessionFileStore from "session-file-store";
import socketUtils from "./src/utils/socket.utils.js";

const server = express();
const PORT = 8080;
const cbReady = () => {
  console.log("server ready on port " + PORT);
  dbConnection();
};

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, cbReady);

socketServer.on("connection", socketUtils);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const FileStore = sessionFileStore(expressSession)

//middlewares
server.use(cookieParser(process.env.SECRET_KEY));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));

//MEMORY STORE
// server.use(expressSession({
//   secret: process.env.SECRET_KEY,
//   resave: true,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000}
// }))

//FILE STORE
// server.use(expressSession({
//   secret: process.env.SECRET_KEY,
//   resave: true,
//   saveUninitialized: true,
//   // cookie: { maxAge: 60000}
//   store: new FileStore({
//     path:"./src/data/fs/files/sessions",
//     ttl: 10,
//     retries: 2
//   })
// }))

//MONGO STORE

server.use(expressSession({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    ttl: 7 * 24 * 60 * 60,
    mongoUrl: process.env.DB_LINK
  })
}))

const router = new IndexRouter()
server.use(morgan("dev"));
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };
