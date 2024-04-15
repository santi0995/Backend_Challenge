import { connect } from "mongoose";
import envUtils from "./env.utils.js";
import logger from "../utils/logger/index.js"

const dbConnection = async () => {
  try {
    await connect(envUtils.DB_LINK);
    logger.INFO("data base connected");
  } catch (error) {
    logger.WARN(error.message);
  }
};

export default dbConnection;
