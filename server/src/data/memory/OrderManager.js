import CustomError from "../../utils/errors/CustomError.js";
import errors from "../../utils/errors/errors.js";
import logger from "../../utils/logger/index.js";

class OrderManager {
  static #orders = [];
  constructor() {}
  create(data) {
    if (data.pid && data.uid && data.quantity && data.state) {
      let order = {
        pid: data.pid,
        uid: data.uid,
        quantity: data.quantity,
        state: data.state,
      };

      const id = OrderManager.#orders.length
        ? OrderManager.#orders.length + 1
        : 1;

      OrderManager.#orders.push({ id, ...data });
      return order;
    } else {
      CustomError.new(errors.missingData)
    }
  }

  read() {
    try {
      return OrderManager.#orders;
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const idExist = OrderManager.#orders.find(
        (order) => order.id == Number(id)
      );
      if (!idExist) {
        CustomError.new(errors.notFound)
      } else {
        return idExist;
      }
    } catch (error) {
      return error.message;
    }
  }
  destroy(id) {
    try {
      let one = OrderManager.#orders.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any order with id=" + id);
      } else {
        OrderManager.#orders = OrderManager.#orders.filter(
          (each) => each.id !== id
        );
        logger.INFO("deleted: " + JSON.stringify(id));
        return OrderManager.#orders
      }
    } catch (error) {
      return error.message;
    }
  }
  updateProduct(pid, uid, quantity, state, oid) {
    try {
      const one = this.readOne(uid);
      if (one === "No existe el id") {
        throw new Error("There isn't any order with id: " + oid);
      } else {
        (one.id = oid),
          (one.pid = pid),
          (one.uid = uid),
          (one.quantity = quantity),
          (one.state = state);

        return one;
      }
    } catch (error) {
      logger.WARN(error.message);
      return error.message;
    }
  }
}

const order = new OrderManager();

order.create({
  pid: "1",
  uid: "1",
  quantity: 10,
  state: "En envío",
});
