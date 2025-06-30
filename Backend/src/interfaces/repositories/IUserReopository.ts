import { User } from "../../domain/entities/User";
import { update } from "../../infrastructure/repo/UserRepo";

export interface IUserRepository{
    findByEmail(email:string):Promise<User | null>,
    findById(id:string):Promise<User | null>,
    update(user:update):Promise<boolean>,
    save(user:User):Promise<boolean>
}