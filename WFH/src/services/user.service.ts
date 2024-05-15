import { inject, injectable } from "inversify";
import { UserRepository } from "../dal";
import { IUser } from "../model";
import { generateAccessToken,comparePassword } from "../utils/token";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt";

@injectable()
export class UserService{
    // Placeholder class
    constructor(@inject(UserRepository) private userDal:UserRepository){
    }

    /**
     * this function use for get user by id
     * @param id 
     * @returns 
     */
    async getUserById(id: string):Promise<IUser | null>{
        return await this.userDal.getUserById(id);
    }

    /**
     * this function use for login user
     * @param email 
     * @param name 
     */
    async loginUser(email: string,password:string,name?:string):Promise<any>{
        const userDetails:any = await this.userDal.findUserByEmail(email,name);
        
        if(!userDetails){
            return {};
        }
        const passwordMatch = await comparePassword(password,userDetails.password);
        userDetails.password = undefined;

        if(passwordMatch){
            const accessToken = generateAccessToken(userDetails._id,userDetails.email,userDetails.name,userDetails.role);
            return {user:userDetails,accessToken};
        }
        else{
            return {};
        }
    }

    /**
     * this function is use for register user
     * @param name 
     * @param email 
     * @param password 
     * @param isAuther 
     * @param bio 
     * @param nationlity 
     * @param role 
     * @returns 
     */
    async createUser(name:string,email:string,password:string,isAuther:boolean,bio:string,nationlity:string,role:string):Promise<any>{
        const isEmailExist = await this.userDal.findUserByEmail(email);
        if(isEmailExist){
            throw new ApiError(400,"Email already exist");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user:IUser | null =  await this.userDal.createUser(name,email,hashedPassword,isAuther,bio,nationlity,role);
        if(user){
            const accessToken = generateAccessToken(user._id,user.email,user.name,user.role);
            return {user,accessToken};
        }
        return {};
    }
}