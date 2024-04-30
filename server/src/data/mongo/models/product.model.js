import { Schema, Types, model } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "products";
const schema = new Schema(
  {
    owner_id: { type: Types.ObjectId, required: true, ref: "users" },
    title: { type: String, required: true, index: true },
    photo: { type: String, default: "" },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

schema.plugin(moongosePaginate);

const Product = model(collection, schema);

export default Product;
