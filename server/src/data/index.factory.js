import argsUtil from "../utils/args.utils.js"
import dbConnection from "../utils/db.js";

const environment = argsUtil.env
let dao = {};

switch (environment) {
  case "test":
    //vamos a usar MEMORY
    console.log("MEMORY CONNECTED");
    const { default: ProductsMemory } = await import("./memory/ProductManager.js")
    dao = { products: ProductsMemory }
    break;
  case "dev":
    //vamos a usar FS
    console.log("FS CONNECTED");
    const { default: productsFs } = await import("./fs/ProductManager.fs.js")
    const { default: usersFs } = await import("./fs/UserManager.fs.js")
    const { default: ordersFs } = await import("./fs/OrdersManager.fs.js")
    const { default: commentsFs } = await import("./fs/CommentManager.fs.js")
    dao = { products: productsFs, users: usersFs, orders: ordersFs, comments: commentsFs }
    break;
  case "prod":
    //vamos a usar MONGO
    //aca es necesario configurar la conexión de mongo
    dbConnection()
      .then(() => console.log("MONGO CONNECTED"))
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