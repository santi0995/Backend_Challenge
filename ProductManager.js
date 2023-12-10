class ProductManager {
  static #products = [];

  create(data) {
    if (data.title && data.photo && data.price && data.stock) {
      let product = {
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      const id = ProductManager.#products.length ? ProductManager.#products.length + 1 : 1;

      ProductManager.#products.push({ id, ...data });
      return product;
    }
    else {
        console.log("Datos faltantes");
    }
  }

  read() {
    return ProductManager.#products;
  }

  readOne(id){
    return ProductManager.#products.find((prod)=> prod.id ==id);
  }
}

const product = new ProductManager();


  product.create({
    title: "Acondiconador",
    photo: 'https://img.com',
    price: 1000,
    stock: 700,
  });

  product.create({
    title: "Arroz",
    photo: 'www',
    price: 1000,
    stock: 700,
  });

console.log(product.read());
console.log(product.readOne(2));
