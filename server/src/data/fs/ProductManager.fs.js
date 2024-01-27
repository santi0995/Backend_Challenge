import crypto from "crypto";
import fs from "fs";
const ruta = "./src/data/fs/files/Productfs.json"
const config = "utf-8";

class ProductManagerFs {
  constructor() {}
  async create(data) {
    try {

      const existingData = await fs.promises.readFile(ruta, 'utf-8');
      const products = JSON.parse(existingData);

      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      products.push(product);
      const jsonData = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(ruta, jsonData);
      return product;
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
      const idExist = contenidoparseado.find((prod) => prod.id === id);
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
        throw new Error("There isn't any product with id: " + id);
      } else {
        contenidoparseado = contenidoparseado.filter((each) => each.id !== id);
        const jsonData = JSON.stringify(contenidoparseado, null, 2);
        await fs.promises.writeFile(ruta, jsonData);
        console.log("deleted: " + id);
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

 async update(title, photo, price, stock, pid) {
   
    const existingData = await fs.promises.readFile(ruta, 'utf-8');
      const products = JSON.parse(existingData);

    try {
      const one = this.readOne(pid);
      if (one === "not found!") {
        throw new Error("There isn't any product with id: " + pid);
      } else {
        (one.id = pid),
          (one.title = title),
          (one.photo = photo),
          (one.price = price),
          (one.stock = stock);

        products.push(one);
        const jsonData = JSON.stringify(products, null, 2);
        fs.writeFileSync(ruta, jsonData);
        console.log(one);
        return one;
      } 
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const product = new ProductManagerFs;

export default product;
