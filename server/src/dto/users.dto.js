import argsUtil from "../utils/args.utils.js";
import crypto from "crypto";

class UserDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
    this.lastName = data.lastName;
    this.photo = data.photo;
    this.age = data.age || 18;
    this.role = data.role || 0;
    this.verified = data.verified || false;
    this.verifiedCode = crypto.randomBytes(12).toString("base64")
    argsUtil.env !== "prod" && (this.updatedAt = new Date());
    argsUtil.env !== "prod" && (this.createdAt = new Date());
  }
}

export default UserDTO;