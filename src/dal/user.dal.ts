import { injectable } from "inversify";
import { IUser, User } from "../model";

@injectable()
export class UserRepository{


    /**
     * this function user for register user
     * @param name 
     * @param email 
     * @param password 
     * @param isAuther 
     * @param bio 
     * @param nationlity 
     * @param role 
     * @returns 
     */
    async createUser(name:string,email:string,password:string,isAuther:boolean,bio:string,nationlity:string,role:string):Promise<IUser | null>{

        const user:IUser = await User.create({
            name,
            email,
            password,
            isAuther,
            bio,
            nationlity,
            role
        })
        const createUser: IUser | null = (await User.findById(user._id).select("-password")) as IUser || null;
        return createUser;
    }

    /**
     * this function user for find user by email or name
     * @param email 
     * @param name 
     * @returns 
     */
    async findUserByEmail(email: string,name?:string): Promise<IUser | null> {
        return await User.findOne({$or:[{email},{name}]}).select("-createdAt -updatedAt") as IUser | null;
    }

    /**
     * this function use for get user by id
     * @param id 
     * @returns 
     */
    async getUserById(id: string): Promise<IUser | null>{
        return await User.findById(id).select("-password") as IUser | null;
    }
}