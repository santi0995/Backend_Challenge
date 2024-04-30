import { Schema, Types, model } from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";

const collection = "comments";
const schema = new Schema(
  {
    text: { type: String, required: true },
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    product_id: { type: Types.ObjectId, required: true, ref: "events" },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.pre("find", function () {
  this.populate("user_id", "-password -createdAt -updatedAt -__v");
});
schema.pre("find", function () {
  this.populate("product_id", "title photo price stock");
});

const Comment = model(collection, schema);
export default Comment;