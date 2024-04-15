import argsUtil from "../args.utils.js";

const environment = argsUtil.env;
let logger = {};

switch (environment) {
  case "prod":
    const { default: winstonProd } = await import("./winston.utils.js");
    logger = winstonProd;
    break;
  default:
    const { default: winstonDev } = await import("./winstonDev.utils.js");
    logger = winstonDev;
    break;
}

export default logger;
