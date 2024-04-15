import CustomError from "../../utils/errors/CustomError.js";
import errors from "../../utils/errors/errors.js";
import fs from "fs";
import logger from "../../utils/logger/index.js";
const ruta = "./src/data/fs/files/Productfs.json";
const config = "utf-8";

class ProductManagerFs {
  constructor() {}
  async create(data) {
    try {
      const existingData = await fs.promises.readFile(ruta, "utf-8");
      const products = JSON.parse(existingData);

      products.push(data);
      const jsonData = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(ruta, jsonData);
      return data;
    } catch (error) {
      return error.message;
    }
  }

  // Implementación sincrónica

  read({ filter, options }) {
    //añadir filtro paginacion y orden
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      const contenidoparseado = JSON.parse(contenidoLeido);
      if (contenidoparseado.length === 0) {
        CustomError.new(errors.notFound);
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
      const idExist = contenidoparseado.find((prod) => prod._id === id);
      if (!idExist) {
        CustomError.new(errors.notFound);
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
        CustomError.new(errors.notFound);
      } else {
        contenidoparseado = contenidoparseado.filter((each) => each._id !== id);
        const jsonData = JSON.stringify(contenidoparseado, null, 2);
        await fs.promises.writeFile(ruta, jsonData);
        logger.INFO("deleted: " + JSON.stringify(id));
        return one;
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

  async update(pid, data) {
    const existingData = await fs.promises.readFile(ruta, "utf-8");
    const products = JSON.parse(existingData);

    try {
      const one = this.readOne(pid);
      CustomError.new(errors.notFound);

      for (let each in data) {
        one[each] = data[each];
      }
      const jsonData = JSON.stringify(products, null, 2);
      fs.writeFileSync(ruta, jsonData);
      logger.INFO(JSON.stringify(one));
      return one;
    } catch (error) {
      logger.WARN(error.message);
      return error.message;
    }
  }
}

const product = new ProductManagerFs();

export default product;
