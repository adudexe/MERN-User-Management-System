import { IAdminRepository } from "../../interfaces/repositories/IAdminRepository";

interface UpdateUserRequest{
    name:string,
    email:string,
    // role:string,
    password:string,
    profile:string,
}


export class AdminAddUser{
    constructor(
        private adminRepo:IAdminRepository
    ){}

    async execute({name,email,password,profile}:UpdateUserRequest){
        const newName = name.trim();
        const newEmail = email.trim();
        const newPasswoord = password.trim();
        const newProfile = profile.trim();
        
        if(!newEmail || !newName || !newPasswoord || !newPasswoord || !newProfile){
            throw new Error("No fields can be emtpy");
        }

        const result = await this.adminRepo.findByEmail(email);

        if(result){
            throw new Error(" Account Already Exits ");
        }

        await this.adminRepo.save({id:null,name,email,role:"user",password,profile});
    }
}