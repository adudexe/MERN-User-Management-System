import { User } from "../../domain/entities/User";
import { IUserRepository } from "src/interfaces/repositories/IUserReopository";
import userSchema from "../database/models/userSchema";
import { ObjectId } from "mongodb";



export class userRepo implements IUserRepository{

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

    async save(user: User): Promise<boolean> {
            const result = await userSchema.create({
                name:user.name,
                email:user.email,
                password:user.password,
                profile:user.profile
            });
            if(result){
                return true;
            }
            return false;
        }
    
    async update(user: User): Promise<boolean> {
        if(!user.id){
            throw new Error("User Id is required for update");
        }
        const filter = { _id: new ObjectId(user.id) };
        const update = { $set:{
            name:user.name,
            email:user.email,
            password:user.password,
            profile:user.profile
        }};
        const result = await userSchema.updateOne(filter,update);
        if(result){
            return true;
        }
        return false;
    }

}