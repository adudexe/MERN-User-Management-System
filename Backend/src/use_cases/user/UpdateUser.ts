import { isThisTypeNode } from "typescript";
import { IUserRepository } from "../../interfaces/repositories/IUserReopository";

interface UpdateUserRequest{
    id:string,
    name:string,
    email:string,
    profile:string,
}

export class UpdateUser{
    constructor(
        private userRepo:IUserRepository
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

        const result = this.userRepo.findById(id);

        if(!result){
            throw new Error('User Not found');
        }

        await this.userRepo.update({id,name,email,profile});

    }

}