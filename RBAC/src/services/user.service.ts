import { injectable } from "inversify";
import { IUser, RoleModel, UserModel } from "@model";
import { ApiError, comparePassword, generateAccessToken } from "@utils";
import bcrypt from 'bcrypt'
import { boolean } from "joi";

interface ICUser {
    name: string,
    email: string,
    password: string,
    phone?: string
}

interface IUUser {
    id: string
    name?: string
    email?: string
    phone?: string
    roleId?: string,
    isActive?: boolean
}

interface ISUser {
    name: string
    page: number
    limit: number
}

@injectable()
export class UserService {

    async create(data: ICUser): Promise<any> {
        const existingUser = await UserModel.findOne({ email: data.email });

        if (existingUser) {
            throw new ApiError(400, "Email id already exists");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;

        const newUser: any = await UserModel.create(data)
        newUser.isDeleted = undefined
        newUser.isActive = undefined
        newUser.password = undefined

        const accessToken = generateAccessToken(newUser.id, newUser.email, newUser.name);
        return { newUser, accessToken }
    }

    async update(data: IUUser): Promise<IUser> {

        const { id, ...updateData } = data
        const userExists = await UserModel.findOne({ _id: id, isDeleted: false });

        if (!userExists) {
            throw new ApiError(400, "User not found");
        }

        if (!userExists.isActive) {
            throw new ApiError(400, "User is not active. Please contact Administration");
        }
        if (updateData.email) {
            const emailExists = await UserModel.findOne({ email: updateData.email });
            if (emailExists && emailExists._id.toString() !== id) {
                throw new ApiError(400, "Email already exists");
            }
        }


        const updatedUser: any = await UserModel.findOneAndUpdate(
            { _id: id },
            { $set: { ...updateData } },
            { upsert: true, new: true }
        );

        updatedUser.isDeleted = undefined
        updatedUser.isActive = undefined
        updatedUser.password = undefined
        return updatedUser
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


    async getUser({ name = "", page = 1, limit }: ISUser): Promise<IUser[]> {
        console.log(name, page, limit)
        const pipeline: any[] = [
            {
                $match: {
                    isDeleted: false
                }
            },
            ...(
                name.trim() != "" ? [{
                    $match: {
                        name: { $regex: name, $options: "i" }
                    }
                }] : []
            ),
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "roles"
                }
            },
            { $unwind: "$roles" },
            {
                $addFields: {
                    roleName: "$roles.name"
                }
            },
            {
                $project: {
                    "roles": 0,
                    "isActive": 0,
                    "password": 0,
                    "isDeleted": 0
                }
            },
        ]

        // Pagination stages if 'page' is provided
        if (page !== -1) {
            pipeline.push(
                { $skip: (page - 1) * limit },
                { $limit: limit }
            );
        }

        console.log(pipeline)

        return await UserModel.aggregate(pipeline);
    }

    async rolechange(userId: string, roleId: string): Promise<void> {
        if (!(await RoleModel.findById(roleId))) throw new ApiError(401, "role id is not valid")

        if (!(await UserModel.findOne({
            $and: [{ "_id": userId }, { "isDeleted": false }]
        }))) throw new ApiError(401, "User not found")

        await UserModel.findByIdAndUpdate(
            { _id: userId },
            { $set: { roleId } },
            { upsert: true, new: true }
        )
    }


    async login(email: string, password: string): Promise<any> {
        const user: any = (await UserModel.findOne({
            $and: [{ "email": email }, { "isDeleted": false }]
        }))
        if (!user) throw new ApiError(401, "User not found")

        const isValidPassword = await comparePassword(password, user.password)
        if (!isValidPassword) throw new ApiError(401, "Invalid crditaional")

        user.isDeleted = undefined
        user.isActive = undefined
        user.password = undefined

        const accessToken = generateAccessToken(user.id, user.email, user.name);

        return {user,accessToken}
    }

}