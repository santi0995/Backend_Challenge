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

  read() {
    try {
      return ProductManager.#products;
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
      let one = ProductManager.#products.find((each) => each.id === id);
      if (!one) {
        throw new Error("There isn't any product with id=" + id);
      } else {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== id
        );
        console.log("deleted: " + id);
        return ProductManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }
  updateProduct(title, photo, price, stock, uid) {
    try {
      const one = this.readOne(uid);
      if (one === "No existe el id") {
        throw new Error("There isn't any product with id: " + uid);
      } else {
        (one.id = uid),
          (one.title = title),
          (one.photo = photo),
          (one.price = price),
          (one.stock = stock);

        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

const product = new ProductManager();

product.create({
  title: "Acondicionador",
  photo: "https://img.com",
  price: 1000,
  stock: 700,
});

product.create({
  title: "Arroz",
  photo: "www",
  price: 350,
  stock: 10,
});

product.updateProduct("panchi", "png", "panchi2@hotmail.com", "1");
console.log(product.read());
