import CustomError from "./errors/CustomError.js";
import errors from "./errors/errors.js";

function has8char(password) {
  if (password.length < 8) {
    CustomError.new(errors.auth)
  }
}

export default has8char;
