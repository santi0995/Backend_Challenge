const fs = require("fs");
const ruta = "./app/data/Productfs.json";
const rutaAsync = "./app/data/Productfs.async.json";
const rutaPromise = "./app/data/Productfs.promise.json";
const config = "utf-8";
const products = [];

class ProductManagerFs {
  create(data) {
    if (data.title && data.photo && data.price && data.stock) {
      let product = {
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };

      const id = products.length === 0 ? 1 : products.length + 1;
      products.push({ id, ...data });
      return product;
    } else {
      throw new Error("Datos faltantes");
    }
  }

  // Implementación sincrónica

  read() {
    const contenidoLeido = fs.readFileSync(ruta, config);
    const contenidoparseado = JSON.parse(contenidoLeido);
    return contenidoparseado;
  }

  readOne(id) {
    const contenidoLeido = fs.readFileSync(ruta, config);
    const contenidoparseado = JSON.parse(contenidoLeido);
    const idExist = contenidoparseado.find((prod) => prod.id == id);
    if (!idExist) {
      throw new Error("No existe el id");
    } else {
      return idExist;
    }
  }
  delete() {
    fs.unlinkSync(ruta);
  }
}

const product = new ProductManagerFs();

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

fs.writeFileSync(ruta, contenido);

fs.writeFile(rutaAsync, contenido, (error) => {
  if (error) {
    return error.message;
  }
});

fs.promises.writeFile(rutaPromise, contenido)
.then(res => console.log("Creado Correctamente"))
.catch(error => console.log(error));

// Implementación con callbacks

function readAsync() {
  fs.readFile(rutaAsync, config, (error, resultado) => {
    if (error) {
      return error;
    }
    const parseado = JSON.parse(resultado);
    console.log(parseado);
    return resultado;
  });
}

function readOneAsync(id) {
  fs.readFile(rutaAsync, config, (error, resultado) => {
    if (error) {
      return error;
    }
    const parseado = JSON.parse(resultado)
    const idExist = parseado.find((prod) => prod.id == id)
    if(!idExist){
        throw new Error("No existe el id")
    } 
    console.log(idExist);
  });
}

function deleteFile(){
    fs.unlink(rutaAsync, (error) =>{
        if(error) {
            return error.message
        }
    })
}

// Implementación con promesas

function readFilePromise () {
    fs.promises.readFile(rutaPromise, config)
    .then(res => {
        const parse = JSON.parse(res)
        console.log(parse);
    })
    .catch(error => console.log(error))
}

function readOnePromise(id){
    fs.promises.readFile(rutaPromise, config)
    .then(res => {
        const parse = JSON.parse(res)
        const idExist = parse.find((prod) => prod.id == id)
        if(!idExist){
            throw new Error("No existe el id")
        } 
        console.log(idExist);
    })
}

function deletePromise(){
    fs.promises.unlink(rutaPromise)
    .then(res => (console.log("Eliminado correctamente")))
    .catch(error => console.log("Ocurrió un error"))
}

// readOnePromise(2)
// readFilePromise();
// deleteFile();
// readAsync();
// readOneAsync(2);
// console.log(product.read());
// console.log(product.readOne(2));
// product.delete();
