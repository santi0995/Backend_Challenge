import { connect } from "mongoose";
import envUtils from "./env.utils.js";

const dbConnection = async () => {
  try {
    await connect(envUtils.DB_LINK);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
