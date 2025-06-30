import { IAdminRepository } from "../../interfaces/repositories/IAdminRepository";


export class AdminDeleteUser{
    constructor(
        private adminRepo:IAdminRepository
    ){}
    
    async execute(id:string){
        if(!id){
            throw new Error("Invalid id");
        }

        const result = await this.adminRepo.findById(id)

        if(!result){
            throw new Error(" No User Found ");
        }

        const status = await this.adminRepo.delete(id);

        return status;
    }
}