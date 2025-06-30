import { IAdminRepository } from "../../interfaces/repositories/IAdminRepository";

export class AdminHome{
    constructor(
        private adminRepo:IAdminRepository
    ){}

    async execute(){
        const data = await this.adminRepo.findAll();
        if(!data){
            throw new Error("No Data found");
        }        
        return data
    }
}