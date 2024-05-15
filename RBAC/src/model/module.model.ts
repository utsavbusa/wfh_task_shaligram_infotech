import mongoose,{Document,Schema,Model} from "mongoose";

interface IModule extends Document{
    name: string
}

const ModuleSchema:Schema<IModule> = new Schema({
    name:{
        type: String,
        unique:true
    }
},{timestamps:true})

const ModuleModel:Model<IModule> = mongoose.model<IModule>('Module',ModuleSchema)

export {
    IModule,
    ModuleModel
}