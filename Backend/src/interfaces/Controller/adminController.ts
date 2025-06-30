import { AdminUpdateUser } from "../../use_cases/admin/AdminUpdateUser";
import { AdminLogin } from "../../use_cases/admin/AdminLogin";
import { AdminAddUser } from "../../use_cases/admin/AdminAddUser"
import { AdminDeleteUser } from "../../use_cases/admin/AdminDeleteUser";
import { AdminHome } from "../../use_cases/admin/AdminHome";
import { AdminGetUser } from "src/use_cases/admin/AdminGetUser";
import { verifyRefreshToken,signAccessToken } from "../../utils/jwt";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

export class AdminController {
    constructor(
        private addUser:AdminAddUser,
        private updateUser:AdminUpdateUser,
        private login:AdminLogin,
        private deleteUser:AdminDeleteUser,
        private home:AdminHome,
        private getUserData:AdminGetUser
    ){}

    async adminLogin(req:Request,res:Response){
        try{
            const {email,password} = req.body;
            if(!email || !password){
                res.status(401).json({ error:"Email and Password are Required" });
                return;
            }
            const { accessToken,refreshToken } = await this.login.execute({email,password});
            
            res.status(200).cookie('refreshToken',refreshToken,{
                httpOnly:true,
                sameSite:'lax'
            }).json({ token:accessToken,redirectTo:"/dashborad",message:"Successfully Logged in" })
        } catch(err:any) {
            console.log("Error in adminLogin Controller",err);
            res.status(500).json({ error:err.message })
        }

    }

    async adminDelete(req:Request,res:Response){
        try{
            const {id} = req.params;
            if(!id){
                res.status(400).json({ error:"Invalid Id" });
            }
            const status = await this.deleteUser.execute(id);
            if(status){
                res.status(200).json({ message:"User Successfully Deleted" });
                return;
            }
            res.status(400).json({ message:"did not delete user Something went wrong" });

        }catch(err:any){
            console.log("Error in adminDelete Controller",err);
            res.status(500).json({ error:err.message });
        }
    }

    async adminUpdate(req:Request,res:Response){
        try{
            const {id,name,email,profile} = req.body;
            const newName = name.trim();
            const newEmail = email.trim();
            const newProfile = profile.trim();

            if(!newEmail || !newName  || !newProfile){
                res.status(400).json({ error:"No fields can be empty" });
                return;
            }

            if(!id){
                res.status(400).json({ error:"Invalid Id" });
                return;
            }
            
            this.updateUser.execute({id,name,email,profile});
            res.status(200).json({ message:"Data Successfully Updated" });

        } catch(err:any) {
            console.log("Error in adminUpdate Controller",err);
            res.status(400).json({ error:err.message }); 
        }
    }

    async adminAdd(req:Request,res:Response){
        try{
            const { name,email,password,profile } = req.body;
            const newName = name.trim();
            const newEmail = email.trim();
            const newPasswoord = password.trim();
            const newProfile = profile.trim();

            if(!newEmail || !newName || !newPasswoord || !newProfile){
                res.status(400).json({ error:"No fields can be empty" });
                return;
            }

            const hashedPassword = await bcrypt.hash(password,10)

            await this.addUser.execute({name,email,password:hashedPassword,profile});

            res.status(200).json({ message:"User Successfully Added" });

        } catch(err:any){
            console.log("Error in adminAdd Controller",err);
            res.status(500).json({ error:err.message });
        }
    }

    async getHome(req:Request,res:Response){
        try{
            const data = await this.home.execute();
            res.status(200).json({ data });
        } catch(err:any){
            console.log("Error in admin getHome Controller",err);
            res.status(400).json({ error:err.message });
        }
    }

    async getData(req:Request,res:Response){
        try{
            const { id } = req.params;
            if(!id){
                res.status(400).json({ error:"Invalid Id" });
                return;
            }
            const data = await this.getUserData.execute(id);

            res.status(200).json({ data });
        } catch(err:any){
            console.log("Error in admin getData Controller",err);
            res.status(500).json({ error:err.message }); 
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


}