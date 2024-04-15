import { connect } from "mongoose";
import envUtils from "./env.utils.js";
import winstonUtils from "./logger/winston.utils.js";

const dbConnection = async () => {
  try {
    await connect(envUtils.DB_LINK);
    winstonUtils.INFO("data base connected");
  } catch (error) {
    winstonUtils.WARN(error.message);
  }
};

export default dbConnection;
