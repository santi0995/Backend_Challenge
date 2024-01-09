import crypto from "crypto";
import fs from "fs";
const ruta = "./data/fs/files/Productfs.json";
const rutaAsync = "./data/fs/files/Productfs.async.json";
const rutaPromise = "./data/fs/files/Productfs.promise.json";
const config = "utf-8";
const products = [];

class ProductManagerFs {
  constructor() {}
  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error ("Datos faltantes")
      }
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };
      products.push(product);
      const jsonData = JSON.stringify(products, null, 2)
      await fs.promises.writeFile(rutaPromise, jsonData)
      return product;
    } catch (error) { 
      return error.message
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

  async destroyOne(id){
    try {
      const contenidoLeido = fs.readFileSync(ruta, config);
      let contenidoparseado = JSON.parse(contenidoLeido);
      let one = contenidoparseado.find((each)=>each.id === id);
      if (!one) {
        throw new Error("There isn't any product with id: " + id)
      }else{
        contenidoparseado = contenidoparseado.filter((each) => each.id !== id)
        const jsonData = JSON.stringify(contenidoparseado, null, 2)
        await fs.promises.writeFile(ruta, jsonData)
        console.log("deleted: " + id);
        return id
      }
    } catch (error) {
      return error.message
    }
  }

  
  delete() {
    try {
      fs.unlinkSync(ruta);
    } catch (error) {
      return error.message;
    }
  }

//   async updateProduct(title, pid) {
//     try {
//       const one = this.readOne(pid);
//       if (one) {
//         if (one.title != title) {
//           const jsonData = JSON.stringify(products, null, 2);
//           await fs.promises.writeFile(rutaPromise, jsonData);
//           console.log("Producto Modificado " + one);
//           return one;
//         } else {
//           throw new Error("Los productos son iguales");
//         }
//       } else {
//         throw new Error("There isn't any event");
//       }
//     } catch (error) {
//       console.log(error.message);
//       return error.message;
//     }
// }
}



const product = new ProductManagerFs("./data/fs/files/Productfs.json");

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

const contenido = JSON.stringify(products, null, 2);

// fs.writeFileSync(ruta, contenido);

// fs.writeFile(rutaAsync, contenido, (error) => {
//   if (error) {
//     return error.message;
//   }
// });

// fs.promises
//   .writeFile(rutaPromise, contenido)
//   .then((res) => console.log("Creado Correctamente"))
//   .catch((error) => console.log(error));

// Implementación con callbacks

function readAsync() {
  try {
    fs.readFile(rutaAsync, config, (error, resultado) => {
      if (error) {
        return error;
      }
      const parseado = JSON.parse(resultado);
      console.log(parseado);
      return resultado;
    });
  } catch (error) {
    return error.message;
  }
}

function readOneAsync(id) {
  try {
    fs.readFile(rutaAsync, config, (error, resultado) => {
      if (error) {
        return error;
      }
      const parseado = JSON.parse(resultado);
      const idExist = parseado.find((prod) => prod.id == Number(id));
      if (!idExist) {
        throw new Error("No existe el id");
      }
      console.log(idExist);
    });
  } catch (error) {
    return error.message;
  }
}

function deleteFile() {
  fs.unlink(rutaAsync, (error) => {
    if (error) {
      return error.message;
    }
  });
}

// Implementación con promesas

function readFilePromise() {
  fs.promises
    .readFile(rutaPromise, config)
    .then((res) => {
      const parse = JSON.parse(res);
      console.log(parse);
    })
    .catch((error) => console.log(error));
}

function readOnePromise(id) {
  fs.promises.readFile(rutaPromise, config).then((res) => {
    const parse = JSON.parse(res);
    const idExist = parse.find((prod) => prod.id == Number(id));
    if (!idExist) {
      throw new Error("No existe el id");
    }
    console.log(idExist);
  });
}

function deletePromise() {
  fs.promises
    .unlink(rutaPromise)
    .then((res) => console.log("Eliminado correctamente"))
    .catch((error) => console.log("Ocurrió un error"));
}

export default product;

// console.log(product.updateProduct("arroz", "eca9b7176d2746a70810b63f"));