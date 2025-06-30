import {User} from "../../domain/entities/User";

export type AdminSideView = {
        id:string,
        name:string,
        email:string,
        role:'user',
        password:string,
        profile?:string | null,
}

export interface IAdminRepository{
    findAll():Promise<AdminSideView[] | null>,
    delete(id:string):Promise<boolean>,
    update(user:User):Promise<void>,
    save(user:User):Promise<void>,
    findByEmail(email:string):Promise<User | null>,
    findById(id:string):Promise<User | null>,
}