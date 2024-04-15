import crypto from "crypto";
import fs from "fs";
import user from "./UserManager.fs.js"
import winstonUtils from "../../utils/logger/winston.utils.js";
const ruta = "./src/data/fs/files/Ordersfs.json"
const config = "utf-8";

const uid = user.id;


class OrdersManager {
  constructor() {}
  async create(data) {
    try {

      const existingData = await fs.promises.readFile(ruta, 'utf-8');
      const orders = JSON.parse(existingData);

      if (user.id !== uid) {
        return error("There is no coincidence with any user")
      }

      orders.push(data);
      const jsonData = JSON.stringify(orders, null, 2);
      await fs.promises.writeFile(ruta, jsonData);
      return data;
    } catch (error) {
      return error.message;
    }
  }

  // Implementación sincrónica

  read() {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      const contenidoparseado = JSON.parse(contenidoLeido);
      if (contenidoparseado.length === 0) {
        throw new Error("not found!");
      }
      return contenidoparseado;
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      const contenidoparseado = JSON.parse(contenidoLeido);
      const idExist = contenidoparseado.find((order) => order.id === id);
      if (!idExist) {
        throw new Error("not found!");
      } else {
        return idExist;
      }
    } catch (error) {
      return error.message;
    }
  }

  async destroy(id) {
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      let contenidoparseado = JSON.parse(contenidoLeido);
      let one = contenidoparseado.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any order with id: " + id);
      } else {
        contenidoparseado = contenidoparseado.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(contenidoparseado, null, 2);
        await fs.promises.writeFile(ruta, jsonData);
        winstonUtils.INFO("deleted: " + JSON.stringify(id));
        return id;
      }
    } catch (error) {
      return error.message;
    }
  }

  delete() {
    try {
      fs.unlinkSync(ruta);
    } catch (error) {
      return error.message;
    }
  }

  async update(product_id, user_id, quantity, state, oid) {
    try {
      const existingData = await fs.promises.readFile(ruta, 'utf-8');
      const orders = JSON.parse(existingData);
      const one = this.readOne(oid);
      if (one === "not found!") {
        throw new Error("There isn't any order with id: " + oid);
      } else {
        (one.id = oid),
          (one.product_id = product_id),
          (one.user_id = user_id),
          (one.quantity = quantity),
          (one.state = state);

        orders.push(one);
        const jsonData = JSON.stringify(orders, null, 2);
        fs.writeFileSync(ruta, jsonData);
        winstonUtils.INFO(JSON.stringify(one));
        return one;
      } 
    } catch (error) {
      winstonUtils.WARN(error.message);
      return error.message;
    }
  }
}

const order = new OrdersManager;

export default order;
