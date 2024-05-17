import mongoose,{Document,Schema,Model} from "mongoose";

interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    phone:string,
    isActive:boolean,
    isDeleted:boolean,
    roleId:Schema.Types.ObjectId,
}

const UserSchema:Schema<IUser> = new Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String
    },
    isActive:{
        type:Boolean,
        default:true
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"Role",
        default: new mongoose.Types.ObjectId('6646eb349ed86a63f3811061')
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const UserModel:Model<IUser> = mongoose.model<IUser>("User",UserSchema);

export {
    IUser,
    UserModel
}