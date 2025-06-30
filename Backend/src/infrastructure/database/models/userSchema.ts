import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ 
        type:String,
        required:true 
    },
    email:{ 
        type:String,
        required:true 
    },
    password:{ 
        type:String,
        required:true 
    },
    profile:{ 
        type:String,
        required:false 
    },
    role:{ 
        type:String,
        enum:['admin','user'],
        default:'user',
        required:true
    },
    createdAt:{ type:Date,default:Date.now }
})

export default mongoose.model('User',userSchema);
