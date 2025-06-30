import express, { Router } from "express";
import { userController } from "../../infrastructure/di/DependencyInjection";
import { Request,Response } from "express";
import { authMiddleware } from "../middleware/authMiddleware";



const userRouter = express.Router();

userRouter.post("/login",(req:Request,res:Response) => {
    userController.login(req,res);
})

userRouter.post("/register",(req:Request,res:Response)=>{
    userController.register(req,res);
})

userRouter.get("/profile",authMiddleware,(req:Request,res:Response)=>{
    userController.Profile(req,res);
});

userRouter.get('/logout',authMiddleware,(req:Request,res:Response)=>{
    userController.logout(req,res);
})

userRouter.get('/refresh-token',(req:Request,res:Response)=>{
    userController.refreshToken(req,res);
})

export default userRouter;