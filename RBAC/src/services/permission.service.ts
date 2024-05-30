import { UserRole } from "@config";
import { PermissionModel } from "@model";
import { injectable } from "inversify";
import mongoose from "mongoose";

interface IPermission {
    read: boolean
    write: boolean
    update: boolean
    delete: boolean
}
interface IUPermission {
    moduleId: string
    permission: IPermission
}
interface IUPData {
    roleId: string,
    data: IUPermission[]
}

interface ISModule {
    roleId?: string,
    name?: string,
    userRole?: string,
    page: number,
    limit: number
}

@injectable()
export class PermissionService {
    async update(userData: IUPData): Promise<void> {
        const bulkOperations: any[] = [];
        userData.data.forEach(data => {
            if (!data.moduleId || !data.permission) {
                throw new Error('Invalid data structure in userData');
            }
            const updateFields = { ...data.permission };
            bulkOperations.push({
                updateOne: {
                    filter: {
                        "roleId": new mongoose.Types.ObjectId(userData.roleId),
                        "moduleId": new mongoose.Types.ObjectId(data.moduleId)
                    },
                    update: { $set: updateFields }
                }
            });
        });
        await PermissionModel.bulkWrite(bulkOperations);

    }

    async getModule({ userRole, roleId, name, page, limit }: ISModule): Promise<any> {
        const pipeline: any[] = [
            {
                $lookup: {
                    from: "modules",
                    localField: "moduleId",
                    foreignField: "_id",
                    as: "modules"
                }
            },
            {
                $unwind: "$modules"
            },
            {
                $match: {
                    "modules.isDeleted": false
                }
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "roles"
                }
            },
            {
                $unwind: "$roles"
            },
            {
                $match: {
                    "roles.isDeleted": false
                }
            },
            ...(roleId && userRole === UserRole.Admin ? [{
                $match: { roleId: new mongoose.Types.ObjectId(roleId) }
            }] : [{
                $match: { "roles.name": userRole }
            }]),
            ...(name ? [{
                $match: {
                    "modules.name": { $regex: new RegExp(name, 'i') }
                }
            }] : []),
            {
                $project: {
                    moduleName: "$modules.name",
                    readPermission: "$read",
                    writePermission: "$write",
                    updatePermission: "$update",
                    deletePermission: "$delete",
                }
            },
            ...(page != -1 ?
                [
                    { $skip: (page - 1) * limit },
                    { $limit: limit }
                ] : [])
        ];

        const moduleResult = await PermissionModel.aggregate(pipeline);
        return moduleResult;
    }


}