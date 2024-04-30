import { Server } from "socket.io";
import __dirname from "./utils.js";
import cluster from "cluster";
import compression from "express-compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import { cpus } from "os";
import { createServer } from "http";
import { engine } from "express-handlebars";
import env from "./src/utils/env.utils.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import express from "express";
import logger from "./src/utils/logger/index.js";
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import router from "./src/routers/index.router.js";
import socketUtils from "./src/utils/socket.utils.js";
import winston from "./src/middlewares/winston.mid.js";

const server = express();
const PORT = env.PORT || 8080;
const cbReady = () => {
  logger.INFO("server ready on port " + PORT);
};
server.listen(PORT, cbReady);

const httpServer = createServer(server);
const socketServer = new Server(httpServer);

socketServer.on("connection", socketUtils);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(cookieParser(env.SECRET_KEY));
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//MEMORY STORE
// server.use(expressSession({
//   secret: env.SECRET_KEY,
//   resave: true,
//   saveUninitialized: true,
//   cookie: { maxAge: 60000}
// }))

//FILE STORE
// server.use(expressSession({
//   secret: env.SECRET_KEY,
//   resave: true,
//   saveUninitialized: true,
//   // cookie: { maxAge: 60000}
//   store: new FileStore({
//     path:"./src/data/fs/files/sessions",
//     ttl: 10,
//     retries: 2
//   })
// }))

// //MONGO STORE

// server.use(expressSession({
//   secret: env.SECRET_KEY,
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({
//     ttl: 7 * 24 * 60 * 60,
//     mongoUrl: env.DB_LINK
//   })
// }))

server.use(morgan("dev"));
server.use(winston);
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

// if (cluster.isPrimary) {
//   const coreNumbers = cpus().length;
//   logger.INFO(JSON.stringify(coreNumbers));
//   for (let i = 1; i <= coreNumbers; i++) {
//     cluster.fork();
//   }
// } else {
//   logger.INFO(JSON.stringify(process.pid));
//   server.listen(PORT, cbReady);
// }

export { socketServer };
