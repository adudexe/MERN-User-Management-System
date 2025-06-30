import { signAccessToken, signRefreshToken } from "src/utils/jwt";
import { IAdminRepository } from "../../interfaces/repositories/IAdminRepository";

interface AdminLoginRequest {
    email:string,
    password:string
}

interface AdminLoginResponce{
    accessToken:string,
    refreshToken:string
}

export class AdminLogin{
    constructor(
        private adminRepo:IAdminRepository
    ){}

    async execute({email,password}:AdminLoginRequest):Promise<AdminLoginResponce>{
        if(!email || !password){
            throw new Error("Valid email and password is Required");
        }

        const result = await this.adminRepo.findByEmail(email);
        if(!result){
            throw new Error("User Not Found")
        }

        if(result && result.role !== 'admin'){
            throw new Error("Invalid Credentials")
        }

        const accessToken = signAccessToken({
            userId:result.id,
            email:result.email
        });

        const refreshToken = signRefreshToken({
            userId:result.id,
            email:result.email
        })

        return {
            accessToken,
            refreshToken
        }
    }
}