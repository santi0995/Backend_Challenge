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
      throw new Error("Datos faltantes");
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
        throw new Error("No existe el id");
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
        POrderManager.#orders = OrderManager.#orders.filter(
          (each) => each.id !== id
        );
        console.log("deleted: " + id);
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
      console.log(error.message);
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
