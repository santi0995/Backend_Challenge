import { Router } from "express";
import product from "../../data/fs/ProductManager.fs.js";
const productsRouter = Router()

productsRouter.get("/real", async(req,res,next)=>{
    try {
        const all = await product.read()
        return res.render("real", {products : all})
    } catch (error) {
        next(error)
    }
})
productsRouter.get("/form", (req,res,next)=>{
    try {
        return res.render("form")
    } catch (error) {
        next(error)
    }
})

export default productsRouter