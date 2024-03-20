import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    argsUtils.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex")),
      (this.title = data.title),
      (this.photo = data.photo),
      (this.price = data.price),
      (this.stock = data.stock),
      (this.date = data.date || new Date()),
      argsUtils.env !== "prod" && (this.updatedAt = new Date());
    argsUtils.env !== "prod" && (this.createdAt = new Date());
  }
}

export default ProductDTO;
