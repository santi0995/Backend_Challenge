import { Router } from "express";
import product from "../../data/fs/ProductManager.fs.js";
const productsRouter = Router()

productsRouter.get("/", async(req,res,next)=>{
    try {
        const all = await product.read()
        return res.render("products", {products : all})
    } catch (error) {
        next(error)
    }
})
productsRouter.get("/new", (req,res,next)=>{
    try {
        return res.render("new")
    } catch (error) {
        next(error)
    }
})

export default productsRouter