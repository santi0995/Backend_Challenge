import CustomError from "./errors/CustomError.js";
import errors from "./errors/errors.js";

function propsProductsUtils(data) {
  const { title, photo, price, stock } = data;
  if (!title || !photo || !price || !stock) {
    CustomError.new(errors.missingData)
  }
}

export default propsProductsUtils;
