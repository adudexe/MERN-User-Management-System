import { IAdminRepository } from "../../interfaces/repositories/IAdminRepository";



export class DeleteUser{
    constructor(
        private adminRepo:IAdminRepository
    ){}

    async execute(id:string){
        if(!id){
            throw new Error("Invalid Id");
        }
        //Filter this id in front end also
        const result = await this.adminRepo.delete(id);
        if(result){
            return true;
        }
        return false;
    }
}