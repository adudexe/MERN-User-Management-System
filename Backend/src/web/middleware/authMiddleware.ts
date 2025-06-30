import { Request,Response,NextFunction } from "express";
import { verifyAccessToken } from "../../utils/jwt";


export const authMiddleware = (req:Request,res:Response,next:NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader?.startsWith('Bearer ')){
            res.status(401).json({ error:'Missing or Invalid Token' });
            return
        }
        const token = authHeader?.split(" ")[2];
        const decode = verifyAccessToken(token);
        if(typeof decode === "string"){
            res.status(201).json({ error:"Invalid token or payload" });
            return;
        }
        // console.log(decode);
        req.user = {
            userId:decode.userId,
            email:decode.email
        }

        next();
    } catch(err:any) {
        console.log("Error in Auth MiddleWare",err);
        res.status(401).json({ error:err.message });
    }
}
