import { UserRegister } from "../../use_cases/user/UserRegister";
import { UserLogin } from "../../use_cases/user/UserLogin";
import { Request,Response } from "express";
import { UserHome } from "../../use_cases/user/UserHome";
import { signAccessToken, verifyRefreshToken } from "../../utils/jwt";

export class UserController{
    constructor(
        private userLogin:UserLogin,
        private userResigster:UserRegister,
        private userHome:UserHome
    ){}
    
    async login(req:Request,res:Response):Promise<void>{
        try{
            const {email,password} = req.body;
            if(!email || !password){
                res.status(400).json({ error:"Email and Passowrd are Required" });
                return
            }
    
            const result = await this.userLogin.execute({email,password});
    
            res.status(201).cookie('refreshToken',result?.refreshToken,{
                httpOnly:true,
                sameSite:'lax',
            }).json({ token:result?.accessToken,redirectTo:"/profile" });


        } catch(err:any){
            console.log("Error in Login Controller",err);
            res.status(400).json({ errro:err.message })
        }
    }

    async register(req:Request,res:Response){
        try{
            const{name,email,password,profile} = req.body;

            if(!name || !email || !password) {
                res.status(400).json({ error:"Name Email and Passowrd are Required" });
                return;
            }

            const result = await this.userResigster.execute({name,email,password,profile});
            if(!result){
                res.status(400).json({ error:"Failed To Register" });
                return;
            }
            res.status(200).json({ message:"Succesfully Registered" });

        } catch(err:any){
            console.log("Error in Register Controller",err);
            res.status(400).json({ error:err.message })
        }
    }

    async Profile(req:Request,res:Response){
        try{
            // const {id} = req.params;
            const id = req.user?.userId;
            console.log("User id",req.user);
            if(!id){
                res.status(400).json({ error:"Provide a valid id" });
                return;
            }
            const userData = await this.userHome.execute(id);
            if(!userData){
                res.status(400).json({ error:"No User Data found" });
                return;
            }
        res.status(200).json({ userData });


       } catch(err:any) {
            console.log("Error in Profile Controller",err);
            res.status(400).json({ error:err.message });
       }
    }

    async logout(req:Request,res:Response){
        try{
            res.status(200).clearCookie('refreshToken',{
                httpOnly:true,
                sameSite:'lax'
            }).json({ message:"Successfully Logged Out" });
        } catch(err:any){
            console.log("Error in logout controller",err);
            res.status(400).json({ error:"Failed to Logout" });
        }
    }


    async refreshToken(req:Request,res:Response){
        try{
            const refreshToken = req.cookies.refreshToken;
            if(!refreshToken){
                res.status(400).json({ error:'No Refresh Token' });
                return;
            }
            const decode = verifyRefreshToken(refreshToken);
            if(!decode || typeof decode == "string"){
                res.status(400).json({ errro:'Invalid refresh token' });
                return;
            }

            const accessToken = signAccessToken({
                userId:decode?.userId,
                email:decode?.email
            })
            
            res.status(200).json({accessToken});
        } catch(err:any){
            console.log('Error in refreshToken Controller',err);
        }
    }

}