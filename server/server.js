import { Server } from "socket.io";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { engine } from "express-handlebars";
import env from "./src/utils/env.utils.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import express from "express";
import expressSession from "express-session";
import morgan from "morgan";
import pathHandler from "./src/middlewares/pathhandler.mid.js";
import router from "./src/routers/index.router.js";
import sessionFileStore from "session-file-store";
import socketUtils from "./src/utils/socket.utils.js";

const server = express();
const PORT = env.PORT || 8080;
const cbReady = () => {
  console.log("server ready on port " + PORT);
};

const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, cbReady);

socketServer.on("connection", socketUtils);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

const FileStore = sessionFileStore(expressSession);

//middlewares
server.use(cookieParser(env.SECRET_KEY));
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
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };
