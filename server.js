import express from "express";
import product from "./data/fs/ProductManager.fs.js";
import user from "./data/fs/UserManager.fs.js";

const server = express();

const PORT = 8080;

const cbReady = () => console.log("server ready on port " + PORT);
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, cbReady);

server.post("/api/products", async (req, res) => {
  try {
    const data = req.body;
    const response = await product.create(data);
    if (response === "Datos faltantes") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        message: "Created",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/products", async (req, res) => {
  try {
    const all = await product.read();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        success: true,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const one = await product.readOne(pid);
    if (typeof one !== "string") {
      return res.json({
        statusCode: 200,
        success: true,
        response: one,
      });
    } else {
      return res.json({
        statusCode: 404,
        success: false,
        message: one,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
});

// server.put("/api/products/:pid", (req, res) =>{
//   try {
//     const {title, photo, price, stock} = req.params
//   } catch (error) {
//     return res.json({
//       statusCode: 500,
//       success: false,
//       message: error.message
//     });
//   }
// })

server.post("/api/users", async (req, res) => {
  try {
    const data = req.body;
    const response = await user.create(data);
    if (response === "Datos faltantes") {
      return res.json({
        statusCode: 400,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 201,
        message: "Created",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.get("/api/users", (req, res) => {
  try {
    const all = user.read();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        success: true,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", (req, res) => {
  try {
    const { uid } = req.params;
    const one = user.readOne(uid);
    if (one != {}) {
      return res.json({
        statusCode: 200,
        success: true,
        response: one,
      });
    } else {
      return res.json({
        statusCode: 404,
        success: false,
        message: one,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      success: false,
      message: error.message,
    });
  }
});
