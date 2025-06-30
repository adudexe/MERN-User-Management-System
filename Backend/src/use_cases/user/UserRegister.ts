import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../interfaces/repositories/IUserReopository";
import bcrypt from 'bcrypt';


interface RegisterUserRequest{
    email:string,
    password:string,
    name:string,
    profile:string
}

interface RegisterUserResponce{
    
}

export class UserRegister{
    constructor(
        private userRepo:IUserRepository
    ){}

    async execute({email,password,name,profile}:RegisterUserRequest):Promise<string>{
        if(!email || !password){
            throw new Error("Email and password are required...");
        }

        const emailExist = await this.userRepo.findByEmail(email);

        if(emailExist){
            throw new Error("Email Already Exists");
        }
        const hasedPassword = await bcrypt.hash(password,10);
        const result = await this.userRepo.save({ id:null,name,email,role:"user",password:hasedPassword,profile })
        if(result){
            return "Successfully Added";
        }
        return 'Failed To Add'
    }

}