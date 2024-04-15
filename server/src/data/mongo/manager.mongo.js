import CustomError from "../../utils/errors/CustomError.js";
import { Types } from "mongoose";
import errors from "../../utils/errors/errors.js";
import winstonUtils from "../../utils/logger/winston.utils.js";

class MongoManager {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const one = await this.model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read({ filter, options }) {
    try {
      options = { ...options, lean: true };
      const all = await this.model.paginate(filter, options);
      return all;
    } catch (error) {
      CustomError.new(errors.notFound)
      throw error;
    }
  }

  async reportBill(uid) {
    try {
      const report = await this.model.aggregate([
        {
          $match: { user_id: new Types.ObjectId(uid) },
        },
        {
          $lookup: {
            from: "products",
            foreignField: "_id",
            localField: "product_id",
            as: "product_id",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        { $set: { subTotal: { $multiply: ["$price", "$quantity"] } } },
        { $group: { _id: "$user_id", total: { $sum: "$subTotal" } } },
        { $project: { _id: 0, user_id: "$_id", total: "$total", date: new Date(), currency: "€"}},
        // { $merge: { into: "bills"}}
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      CustomError.new(errors.notFound)
      return one;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      const one = await this.model.findById(id).lean();
      return one;
    } catch (error) {
      CustomError.new(errors.notFound)
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      const one = await this.model.findByIdAndUpdate(id, data, opt);
      return one;
    } catch (error) {
      CustomError.new(errors.notFound);
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      return one;
    } catch (error) {
      CustomError.new(errors.notFound);
      throw error;
    }
  }
  async stats(filter) {
    try {
      let stats = await this.find(filter).explain("executionsStats");
      winstonUtils.INFO(JSON.stringify(stats));
      stats = {
        quantity: stats.executionStats.nReturned,
        time: stats.executionStats.executionTimeMills,
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
}


export default MongoManager;
