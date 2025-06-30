import { User } from "src/domain/entities/User";


export interface IUserRepository{
    findByEmail(email:string):Promise<User | null>,
    findById(id:string):Promise<User | null>,
    update(user:User):Promise<boolean>,
    save(user:User):Promise<boolean>
}