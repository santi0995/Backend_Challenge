import crypto  from "crypto"
class ProductManager {
  static #products = [];
  constructor(){}
  create(data) {
    if (data.title && data.photo && data.price && data.stock) {
      let product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };


      ProductManager.#products.push(product);
      return product;
    }
    else {
        throw new Error('Datos faltantes');
    }
  }

  read() {
    try {
      return ProductManager.#products;
    } catch (error) {
      return error.message
    }
  }

  readOne(id){
    try {
      const idExist = ProductManager.#products.find((prod)=> prod.id == Number(id));
      if (!idExist) {
        throw new Error('No existe el id')
      }
      else{
        return idExist;
      }
    } catch (error) {
      return error.message
    }

  }
  destroy(id){
    try {
      let one = ProductManager.#products.find((each) => each.id === id)
      if(!one){
        throw new Error("There isn't any event with id=" + id);
      } else{
        ProductManager.#products = ProductManager.#products.filter((each) => each.id !==id)

      }
    } catch (error) {
      
    }
  }
}

const product = new ProductManager();


  product.create({
    title: "Acondicionador",
    photo: 'https://img.com',
    price: 1000,
    stock: 700,
  });

  product.create({
    title: "Arroz",
    photo: 'www',
    price: 350,
    stock: 10,
  });

console.log(product.read());
console.log(product.readOne(3));
