import { id, injectable } from "inversify";
import { IUser, UserModel } from "@model";
import { ApiError } from "@utils";

interface ICUser {
    name: string,
    email: string,
    password: string,
    phone?: string,
    statusId?: number
    roleId: string
}

interface IUUser {
    id: string
    name?: string
    email?: string
    phone?: string
    roleId?: string,
    isActive?: boolean
}

@injectable()
export class UserService {

    async create(data: ICUser): Promise<IUser> {
        return await UserModel.create(data)
    }

    async update(data: IUUser): Promise<IUser> {

        const { id, ...updateData } = data

        if (!(await UserModel.findOne({
            $and: [
                { _id: id },
                { isDeleted: false }
            ]
        }))) {
            throw new ApiError(400, "User not found")
        }

        return await UserModel.findOneAndUpdate(
            { _id: id },
            { $setOnInsert: { ...updateData } },
            { upsert: true, new: true }
        );
    }

    async delete(id: string): Promise<void> {
        if (!(await UserModel.findOne({
            $and: [
                { _id: id },
                { isDeleted: false }
            ]
        }))) {
            throw new ApiError(400, "User not found")
        }

        const userModel = await UserModel.updateOne(
            { _id: id },
            { $set: { isDeleted: true } }
        );

        if (!(userModel.modifiedCount)) {
            throw new ApiError(500, "Intenal server error when deleting User")
        }
    }

    //TODO not sure this pipeline is working or not 
    async getUser(name: string, page: number, limit: number): Promise<IUser[]> {
        const pipline:any[] = [
            ...[name.trim() !== "" ?
                    {
                        $match: {
                            name: { $regex: name, $options: 'i' }
                        }
                    } : {}
                ],
                {
                    $loopkup:{
                        from:'role',
                        localField: 'roleId',
                        foreignField: '_id',
                        as: 'role'
                    }
                },
                {
                    $unwind: "$role"
                },{
                    $addFields:{
                        role: "$role.name"
                    }
                },{
                    $project:{role:0}
                },
                {
                    $skip: (page - 1) * limit
                },
                {
                    $limit: limit
                }
        ]

        return await UserModel.aggregate(pipline)
    }
}