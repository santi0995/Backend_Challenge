import { Schema, Types, model } from "mongoose";

import moongosePaginate from "mongoose-paginate-v2";

const collection = "orders";
const schema = new Schema(
  {
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      default: "reserved",
      enum: ["reserved", "paid", "delivered"],
    },
  },
  { timestamps: true }
);

schema.pre("find", function () {
  this.populate("user_id");
});
schema.pre("find", function () {
  this.populate("product_id");
});

schema.plugin(moongosePaginate);
const Order = model(collection, schema);

export default Order;
