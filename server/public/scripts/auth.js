import { verifyToken } from "../utils/token.util.js"

export default (req, res, next)=>{
    try {
        const token = req.cookies.token
        const userData = verifyToken(token)
        const { role } = userData
        if(role === 1){
           const login =  document.querySelector("#login")
           login.classList.add("d-none")
        } 
    } catch (error) {
        return next(error)
    }

} 