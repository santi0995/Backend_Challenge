import argsUtil from "../utils/args.utils.js";
import crypto from "crypto";

class CommentDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.text = data.text;
    this.product_id = data.product_id;
    this.user_id = data.user_id;
    argsUtil.env !== "prod" && (this.updatedAt = new Date());
    argsUtil.env !== "prod" && (this.createdAt = new Date());
  }
}

export default CommentDTO;