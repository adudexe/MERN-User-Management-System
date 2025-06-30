import { User } from "src/domain/entities/User";
import { IAdminRepository } from "../../interfaces/repositories/IAdminRepository";
import userSchema from "../database/models/userSchema";
import { AdminSideView } from "../../interfaces/repositories/IAdminRepository";
import { ObjectId } from 'mongodb';

export class AdminRepo implements IAdminRepository {
    
    async findAll(): Promise<AdminSideView[] | null> {
       const result = await userSchema.find({role:"user"});
        if(result.length > 0){
            const finalValue = result.map((value)=>{
                const { name,email,password,role,profile} = value;
                return{
                    id:value._id.toString(),
                    name,
                    email,
                    password,
                    role:"user" as "user",
                    profile
                };
            })
            return finalValue;

        } else {
            return null;
        }
    }

    async delete(id:string): Promise<boolean> {
        const filter = { _id: new ObjectId(id) }
        const result = await userSchema.deleteOne(filter);
        if(result.deletedCount > 0)  return true;
        return false;
        
    }

    async save(user: User): Promise<void> {
        const result = await userSchema.create({
            name:user.name,
            email:user.email,
            password:user.password,
            role:user.role,
            profile:user.profile
        });
        return;
    }

    async update(user: User): Promise<void> {
        const filter = { _id: new ObjectId(user.id!) };
        const update = { $set:{
            name:user.name,
            email:user.email,
            password:user.password,
            role:user.role,
            profile:user.profile
        }};
        const result = await userSchema.updateOne(filter,update);
        return;
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await userSchema.findOne({email:email});
        if(!result) return null;

        return new User(
            result._id.toString(),
            result.name,
            result.email,
            result.role,
            result.password,
            result.profile ? result.profile : ''
        )
    }

    async findById(id: string): Promise<User | null> {
        const result = await userSchema.findOne({ _id:id });
        if(!result) return null

        return new User(
            result._id.toString(),
            result.name,
            result.email,
            result.role,
            result.password,
            result.profile ? result.profile : ""
        )
    }
}