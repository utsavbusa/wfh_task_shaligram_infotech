import { IRole, RoleModel, UserModel } from "@model";
import { ApiError } from "@utils";
import { injectable } from "inversify";

@injectable()

export class RoleService {

    async create(name: string): Promise<IRole> {

        return await RoleModel.create(name)
    }

    async update({ id, name }: { id: string, name: string }): Promise<IRole> {

        if (!(await RoleModel.findOne({
            $and:[
                {_id:id},
                {isDeleted:false}
            ]
        }))) {
            throw new ApiError(400, "Role id is not valid ")
        }

        const roleUpdate: IRole = await RoleModel.findByIdAndUpdate(
            { _id: id },
            { $setOnInsert: { name } },
            { upsert: true, new: true }
        )
        return roleUpdate
    }


    async delete(id:string):Promise<void>{
        if(!(await RoleModel.findOne({
            $and:[
                {_id:id},
                {isDeleted:false}
            ]
        }))){
            throw new ApiError(400,"Role id is not valid ")
        }

        if(await UserModel.findOne({roleId:id})){
            throw new ApiError(401,"Role is assign to some user so you can't delete Role")
        }

        const deleteRole = await RoleModel.updateOne(
            { _id: id },
            { $set: { isDeleted: true } }
        );


        if (!(deleteRole.modifiedCount)) {
            throw new ApiError(500, "Internal server error when deleting module");
        }

    }

    async get(): Promise<IRole[]> {
        return await RoleModel.find();
    }
}