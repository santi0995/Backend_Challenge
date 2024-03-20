import fs from "fs";
import notFoundOne from "../../utils/notFoundOne.utils.js";
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
        const error = new Error("There aren't any document");
        error.statusCode = 404;
        throw error;
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
        contenidoparseado = contenidoparseado.filter((each) => each._id !== id);
        const jsonData = JSON.stringify(contenidoparseado, null, 2);
        await fs.promises.writeFile(ruta, jsonData);
        console.log("deleted: " + id);
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

  async update( pid, data ) {
    const existingData = await fs.promises.readFile(ruta, "utf-8");
    const products = JSON.parse(existingData);

    try {
      const one = this.readOne(pid);
      notFoundOne(one)
      
      for(let each in data){
        one[each] = data[each]
      }
        const jsonData = JSON.stringify(products, null, 2);
        fs.writeFileSync(ruta, jsonData);
        console.log(one);
        return one;
      
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const product = new ProductManagerFs();

export default product;
