import mongoose,{Document,Model,Schema} from "mongoose";

interface IPermission extends Document{
    read:boolean,
    write:boolean,
    update:boolean,
    delete:boolean,
    roleId:Schema.Types.ObjectId,
    moduleId:Schema.Types.ObjectId
}

const PermissionSchema:Schema<IPermission> = new Schema({
    read:{
        type:Boolean,
        default:false
    },
    write:{
        type:Boolean,
        default:false
    },
    update:{
        type:Boolean,
        default:false
    },
    delete:{
        type:Boolean,
        default:false
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