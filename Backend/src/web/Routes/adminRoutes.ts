import express,{ Request,Response } from "express";
import { adminController } from "../../infrastructure/di/DependencyInjection";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";


const adminRouter = express.Router();

adminRouter.post("/login",(req:Request,res:Response) => {
    adminController.adminLogin(req,res);
});

adminRouter.get("/dashboard",adminAuthMiddleware,(req:Request,res:Response) => {
    adminController.getHome(req,res);
});

adminRouter.delete("/:id",adminAuthMiddleware,(req:Request,res:Response) => {
    adminController.adminDelete(req,res);
});

adminRouter.post("/",adminAuthMiddleware,(req:Request,res:Response) => {
   adminController.adminAdd(req,res); 
});

adminRouter.get("/update/:id",adminAuthMiddleware,(req:Request,res:Response) => {
    adminController.getData(req,res);
});

adminRouter.put("/update/:id",adminAuthMiddleware,(req:Request,res:Response) => {
    adminController.adminUpdate(req,res);
});

adminRouter.get("/logout",adminAuthMiddleware,(req:Request,res:Response) => {
    adminController.logout(req,res);
})







export default adminRouter;