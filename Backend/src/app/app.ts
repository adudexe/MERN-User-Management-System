import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import morgan from "morgan";
import { connectMongo } from "../infrastructure/database/db";
import userRouter from "../web/Routes/useRoutes";
import adminRouter from "../web/Routes/adminRoutes";
dotenv.config();

export class App {
    private app:Application;
    
    constructor(){
        this.app = express();
    }

    async init(){ //setup the middleware and routes
        this.setUpMiddleware();
        this.connectDatabase();
        this.setUpRoute();
    }

    private  setUpMiddleware(){
        // this.app.use(cors({
        //     origin:"http://localhost:5173",
        //     credentials:true,  // to get the cookies
        // }));
        console.log("CORS is commeted Currently...");
        this.app.use(cookieParser());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended:true }));
    }

    private connectDatabase(){
        connectMongo();
    }

    private setUpRoute(){
        this.app.use("/",userRouter);
        this.app.use("/admin",adminRouter);
    }

    start(){
        this.app.listen(process.env.PORT,(err)=>{
            if(err){
                console.log('Error Setting Up Server',err);
                return
            }
            console.log(`Listening on the port ${process.env.PORT}`);
        })
    }
}