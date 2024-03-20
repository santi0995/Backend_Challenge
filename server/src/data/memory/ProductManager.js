import notFoundOne from "../../utils/notFoundOne.utils.js";

class ProductManager {
  static #products = [];
  constructor() {}
  create(data) {
    if (data.title && data.photo && data.price && data.stock) {
      let product = {
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      const id = ProductManager.#products.length
        ? ProductManager.#products.length + 1
        : 1;

      ProductManager.#products.push({ id, ...data });
      return product;
    } else {
      throw new Error("Datos faltantes");
    }
  }

  read({ filter, options}) {
    //agregar filtros y demas 
    try {
      if(ProductManager.#products.length === 0){
        const error = new Error("Not found")
        error.statusCode = 404;
        throw error
       } else {
         return ProductManager.#products;
       }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const idExist = ProductManager.#products.find(
        (prod) => prod.id == Number(id)
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
      const one = this.readOne(id)
      notFoundOne(one)
      ProductManager.#products = ProductManager.#products.filter((each) = each.id !== id);
      return one
    } catch (error) {
      return error.message;
    }
  }
  update (uid, data) {
    try {
      const one = this.readOne(uid);
      notFoundOne(one)
      for (let each in data) {
       one[each] = data[each]
      }
        return one; 
    } catch (error) {
      throw error
    }
  }
}

const products = new ProductManager();
export default products
