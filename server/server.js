import __dirname from "./utils.js";
import errorHandler from "./src/middlewares/errorhandler.mid.js";
import express from "express";
import morgan from "morgan"
import pathHandler from "./src/middlewares/pathhandler.mid.js";
import router from "./src/routers/index.router.js";

const server = express();
const PORT = 8080;
const cbReady = console.log("server ready on port " + PORT);

server.listen(PORT, cbReady);

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"))
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);