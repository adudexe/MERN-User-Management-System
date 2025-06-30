import mongoose from 'mongoose';

export const connectMongo = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("DataBase Successfully Connected....");
    } catch(err) {
        console.log("Error in Database Connection",err);
        process.exit(1);
    }
}