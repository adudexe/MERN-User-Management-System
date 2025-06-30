import { IAdminRepository } from "../../interfaces/repositories/IAdminRepository";

interface UpdateUserRequest{
    id:string,
    name:string,
    email:string,
    profile:string,
}


export class AdminUpdateUser{
    constructor(
        private adminRepo:IAdminRepository
    ){}

    async execute({id,name,email,profile}:UpdateUserRequest){
        const newName = name.trim();
        const newEmail = email.trim();
        const newProfile = profile.trim();
        
        if(!newEmail || !newName || !newProfile){
            throw new Error("No fields can be emtpy");
        }

        if(!id){
            throw new Error(" Invalid Id ");
        }

        const result = await this.adminRepo.findById(id);

        if(!result){
            throw new Error(" No User Found ");
        }

        await this.adminRepo.update({id,name,email,profile});

    }
}