import { IAdminRepository } from "../../interfaces/repositories/IAdminRepository";
import { User } from "../../domain/entities/User";



export class AdminGetUser{
    constructor(
        private adminRepo:IAdminRepository
    ){}

    async execute(id:string):Promise<User>{
        if(!id){
            throw new Error("Id is Required");
        }
        const data = await this.adminRepo.findById(id);
        if(!data){
            throw new Error("Invalid User id");
        }
        return data;
    }
}
