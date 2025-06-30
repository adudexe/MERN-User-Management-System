import { IUserRepository } from "../../interfaces/repositories/IUserReopository";
import { signAccessToken,signRefreshToken } from "../../utils/jwt";
import bcrypt from 'bcrypt';


interface LoginUserRequest{
    email:string,
    password:string,
}

interface LoginUserResponce{
    accessToken:string,
    refreshToken:string,
}


export class UserLogin{
    constructor(
        private userRepository:IUserRepository
    ){}

    async execute({email,password}:LoginUserRequest):Promise<LoginUserResponce>{

        if(!email || !password){
            throw new Error("Email and Password are Required");
        }

        const result = await this.userRepository.findByEmail(email);

        if(!result){
            throw new Error("User Not Found");
        }

        const isMatch =  bcrypt.compare(password,result.password);

        if(!isMatch){
            throw new Error("Invalid Credentials");
        }

        const accessToken = signAccessToken({
            userId:result.id,
            email:result.email
        })

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