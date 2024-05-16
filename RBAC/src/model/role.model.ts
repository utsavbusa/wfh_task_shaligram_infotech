import mongoose,{Document,Schema,Model} from "mongoose";

interface IRole extends Document{
    name: string,
    isDeleted:boolean
}

const RoleSchema:Schema<IRole> = new Schema({
    name:{
        type: String,
        unique:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const RoleModel:Model<IRole> = mongoose.model<IRole>('Role',RoleSchema)

export {
    IRole,
    RoleModel
}