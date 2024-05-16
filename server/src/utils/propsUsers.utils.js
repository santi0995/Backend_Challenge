import CustomError from "./errors/CustomError.js";
import errors from "./errors/errors.js";

function propsUsersUtils(data) {
  const { name, photo, email} = data;
  if (!name || !photo || !email) {
 CustomError.new(errors.missingData)
  }
}

export default propsUsersUtils;
