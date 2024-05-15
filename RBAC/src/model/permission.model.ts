import mongoose,{Document,Model,Schema} from "mongoose";

interface IPermission extends Document{
    pno:number,
    roleId:Schema.Types.ObjectId,
    moduleId:Schema.Types.ObjectId
}

const PermissionSchema:Schema<IPermission> = new Schema({
    pno:{
        type:Number,
        default:0
    },
    roleId:{
        type:Schema.Types.ObjectId,
        ref:"Role",
        required:true
    },
    moduleId:{
        type:Schema.Types.ObjectId,
        ref:"Module",
        required:true
    }
})

const PermissionModel:Model<IPermission> = mongoose.model<IPermission>("Permission",PermissionSchema)

export {
    IPermission,
    PermissionModel
}