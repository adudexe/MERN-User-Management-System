import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../interfaces/repositories/IUserReopository";



export class UserHome {
    constructor(
        private userRepo:IUserRepository
    ){}
    

    async execute(id:string):Promise<User>{
        if(!id){
            throw new Error("Id is Required");
        }
        const data = await this.userRepo.findById(id);
        if(!data){
            throw new Error("Invalid User id");
        }
        return data;
    }
}