import { PermissionModel } from "@model";
import { injectable } from "inversify";

interface IPermission{
    read?:boolean
    write?:boolean
    delete?:boolean
    update?:boolean
}

interface ICPermission{
    roleId:string
    moduleId:string,
    permission:IPermission
}

@injectable()
export class PermissionService{
    async update(data:ICPermission[]):Promise<void>{
        const bulkOperations:any[] = [];
        data.forEach(data => {

            const {...updateFeilds} = data.permission

            bulkOperations.push({
                updateOne: {
                    filter: { "roleId": data.roleId, "moduleId": data.moduleId },
                    update: { $set: updateFeilds },
                    upsert: true 
                }
            });
        });

        await PermissionModel.bulkWrite(bulkOperations);
    }
}