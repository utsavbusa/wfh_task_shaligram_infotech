import mongoose,{Document,Schema,Model} from "mongoose";

interface IRole extends Document{
    name: string
}

const RoleSchema:Schema<IRole> = new Schema({
    name:{
        type: String,
        unique:true
    }
},{timestamps:true})

const RoleModel:Model<IRole> = mongoose.model<IRole>('Role',RoleSchema)

export {
    IRole,
    RoleModel
}