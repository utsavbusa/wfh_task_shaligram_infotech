import { injectable } from "inversify";
import mongoose from "mongoose";
import { IRole, PermissionModel, RoleModel,ModuleModel,IModule } from "@model";
import { ApiError } from "@utils";
import { UserRole } from "@config";


@injectable()
export class ModuleService {

    async create(name: string): Promise<void> {

        if (await ModuleModel.findOne({ name })) {
            throw new ApiError(400, "Module Name already present")
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const moduleResult = new ModuleModel({ name });
            await moduleResult.save({ session })

            const moduleId: string = moduleResult._id;

            const roles: IRole[] = await RoleModel.find().session(session);

            // Initialize an array to store the bulk operations
            const bulkOps: any = [];

            // Iterate over each role and create a bulk write operation
            roles.forEach((role) => {
                bulkOps.push({
                    insertOne: {
                        document: {
                            roleId: role._id,
                            moduleId: moduleId,
                            read: role.name === UserRole.Admin,
                            write: role.name === UserRole.Admin,
                            update: role.name === UserRole.Admin,
                            delete: role.name === UserRole.Admin,
                        }
                    }
                });
            });
            await PermissionModel.bulkWrite(bulkOps, { session });
            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            throw error
        } finally {
            session.endSession()
        }


    }

    async update(id:string,name:string): Promise<IModule> {

        if (!(await ModuleModel.findOne({
            $and: [
                { _id: id },
                { isDeleted: false }
            ]
        }))) {
            throw new ApiError(400, "Module not found please check Module ID")
        }

        return await ModuleModel.findOneAndUpdate(
            { _id: id },
            { $setOnInsert: { name } },
            { upsert: true, new: true }
        );

    }

    async delete(id: string): Promise<void> {
        if (!(await ModuleModel.findOne({
            $and: [
                { _id: id },
                { isDeleted: false }
            ]
        }))) {
            throw new ApiError(400, "Module not found please check Module ID")
        }
        const deleteModule = await ModuleModel.updateOne(
            { _id: id },
            { $set: { isDeleted: true } }
        );


        if (!(deleteModule.modifiedCount)) {
            throw new ApiError(500, "Internal server error when deleting module");
        }

    }

}