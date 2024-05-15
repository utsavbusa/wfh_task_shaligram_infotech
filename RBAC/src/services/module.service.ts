import { injectable } from "inversify";
import { IModule } from "src/model/module.model";

@injectable()
export class ModuleService{

    async create(name:string):Promise<IModule>{

        
    }
}