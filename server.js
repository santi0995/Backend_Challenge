import express from "express";
import product from "./data/fs/ProductManager.fs.js";
import user from "./data/fs/UserManager.fs.js"

const server = express();

const PORT = 8080;

const cbReady = () => console.log("server ready on port " + PORT);
server.use(express.urlencoded({ extended: true }));

server.listen(PORT, cbReady);

server.get("/api/products", (req, res) => {
  try {
    const all = product.read();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/products/:pid", (req, res) => {
  try {
    const { pid } = req.params
    const one = product.readOne(pid);
    if (one != {} ) {
      return res.status(200).json({
        success: true,
        response: one,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: one,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/users", (req, res) => {
  try {
    const all = user.read();
    if (Array.isArray(all)) {
      return res.status(200).json({
        success: true,
        response: all,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: all,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

server.get("/api/users/:uid", (req, res) => {
  try {
    const { uid } = req.params
    const one = user.readOne(uid);
    if (one != {} ) {
      return res.status(200).json({
        success: true,
        response: one,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: one,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});