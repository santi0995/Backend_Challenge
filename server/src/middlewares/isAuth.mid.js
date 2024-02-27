import { verifyToken } from "../utils/token.util.js"

export default (req, res, next)=>{
    try {
        const token = req.cookies.token
        const userData = verifyToken(token)
        if(userData){
            return next()
        } else {
            const error =  new Error("Bad auth from middleware")
            error. statusCode = 401
            throw error 
        }
    } catch (error) {
        return next(error)
    }

} 