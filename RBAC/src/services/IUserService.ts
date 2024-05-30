import { IUser } from "@model";
import { ICUser, ISUser, IUUser } from "./user.service";

export interface IUserService {
    create(data: ICUser): Promise<any>;
    update(data: IUUser): Promise<IUser>;
    delete(id: string): Promise<void>;
    getUser(user: ISUser): Promise<IUser[]>;
    rolechange(userId: string, roleId: string): Promise<void> ;
    login(email: string, password: string): Promise<any> 
}