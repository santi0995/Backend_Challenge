
import { Schema, model } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    last_name: { type: String },
    photo: { type: String, default: "" },

    email: { type: String, required: true, unique: true, index: true },

    password: { type: String, required: true },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

schema.plugin(moongosePaginate);
const User = model(collection, schema);

export default User;
