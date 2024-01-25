import product from "../data/fs/ProductManager.fs.js";

export default (req, res, next) => {
  try {
    const { pid, stock } = req.params;
    const one = product.readOne(pid);
    if (one === "not found!") {
      throw new Error("There isn't any product with id: " + pid);
    } else if (one.stock <= 0) {
      throw new Error("There isn't enough stock with id: " + pid);
    } 
  } catch (error) {
    return next(error);
  }
};
