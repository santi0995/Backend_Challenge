import argsUtil from "../utils/args.utils.js"
// import dbConnection from "../utils/db.js";

const environment = argsUtil.env
let dao = {}

switch (environment) {
    case "test":
        console.log("MEMORY CONNECTED");
        const { default: productsMemory } = await import("./memory/ProductManager.js")
        dao = { products: productsMemory}
        break;
    case "dev":
        console.log("FS CONNECTED");
        const { default: productsFs} = await import("./fs/ProductManager.fs.js")
        dao = { products: productsFs}
        break;
    case "prod":
        console.log("MONGO CONNECTED");
        // dbConnection();
        const { default: productsMongo} = await import("./mongo/products.mongo.js")
        dao = { products: productsMongo}
        break;

    default:
        break;
}


export default dao