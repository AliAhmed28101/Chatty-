import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async(req, res, next)=>{

    try {
        //utils mein jwt name diya hai cookie ko tou req.ck.jwt
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"Unauthorized - No Token Provided"})
        }

        //token must be decoded , userId was put in which was encoded when we were generating the token 

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message: "UnAutorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found!"})
        }

        //user is now authenticated
        //add the user to req
        req.user= user

        next()


    } catch (error) {
        console.log("Error in protectRoute middleware", error.message)
        res.status(500).json({message:"Internal Server Error"});
    }
}

