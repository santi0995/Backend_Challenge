import { model, Schema } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    photo: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

const User = model(collection, schema)

export default User;