import argsUtil from "../utils/args.utils.js"
import dbConnection from "../utils/db.js";
import logger from "../utils/logger/index.js";

const environment = argsUtil.env
let dao = {};

switch (environment) {
  case "test":
    logger.INFO("MEMORY CONNECTED");
    const { default: productsMemory } = await import("./memory/ProductManager.js")
    dao = { products: productsMemory }
    break;
  case "dev":
    // dbConnection()
    //   .then(() => logger.INFO("MONGO CONNECTED DEV"))
    // const { default: productsMongoDev } = await import("./mongo/products.mongo.js")
    // const { default: usersMongoDev } = await import("./mongo/users.mongo.js")
    // const { default: ordersMongoDev } = await import("./mongo/orders.mongo.js")
    // const { default: commentsMongoDev } = await import("./mongo/comments.mongo.js")
    // dao = { products: productsMongoDev, users: usersMongoDev, orders: ordersMongoDev, comments: commentsMongoDev }
    logger.INFO("FS CONNECTED");
    const { default: productsFs } = await import("./fs/ProductManager.fs.js")
    const { default: usersFs } = await import("./fs/UserManager.fs.js")
    const { default: ordersFs } = await import("./fs/OrdersManager.fs.js")
    const { default: commentsFs } = await import("./fs/CommentManager.fs.js")
    dao = { products: productsFs, users: usersFs, orders: ordersFs, comments: commentsFs }
    break;
  case "prod":
    dbConnection()
      .then(() => logger.INFO("MONGO CONNECTED"))
    const { default: productsMongo } = await import("./mongo/products.mongo.js")
    const { default: usersMongo } = await import("./mongo/users.mongo.js")
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
    const { default: commentsMongo } = await import("./mongo/comments.mongo.js")
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo, comments: commentsMongo }
    break;
  default:
    break;
}

export default dao;