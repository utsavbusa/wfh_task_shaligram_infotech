import { inject } from 'inversify';
import { httpPost } from 'inversify-express-utils';
import { controller } from 'inversify-express-utils';
import { UserService } from '../services';
import { ErrorHandler } from '../handler/error.handler';
import { Request,Response,NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { CookieOptions } from '../config/interface';

@controller('/user')
export class UserController {
    // Placeholder class
    constructor(
        @inject(UserService) private userService: UserService,
        @inject(ErrorHandler) private errorHandler: ErrorHandler
    ) {
    }

    @httpPost('/register')
    async register(req: Request, res: Response, next: NextFunction) {
        try{
            const {name="",email="",password="",isAuther=false,bio="",nationlity="",role=""} = req.body;
            if (Object.keys(req.body).length === 0) {
                throw new ApiError(400, "please send appropriate data")
            }

            if([name,email,password,bio,nationlity,role].some((val)=>typeof val !== "string" || val.trim() === "")){
                throw new ApiError(400,"please send appropriate data")
            }

            if(typeof isAuther !== "boolean"){
                throw new ApiError(400,"please send appropriate data")
            }

            const user = await this.userService.createUser(name,email,password,isAuther,bio,nationlity,role);

            if(Object.keys(user).length === 0){
            throw new ApiError(500,"Intenal server error")
            }
            const options: CookieOptions = {
                httpOnly: true,
                secure: true
            };
            res
            .cookie("accessToken", user.accessToken, options)
            .jsonResponse(user, "User registered successfully", 200)

        }catch(err){
            this.errorHandler.handleError(err,req,res,null)
        }
    }

    @httpPost('/login')
    async login(req: Request, res: Response, next: NextFunction) {
        const { email = "", password = "" } = req.body;
        try{
            if (Object.keys(req.body).length === 0) {
                throw new ApiError(400, "please send appropriate data")
            }
            if ((typeof email !== "string" && email.trim() !== "") || (typeof password !== "string" && password.trim() !== "")) {
                throw new ApiError(400, "Invalid data")
            }
            const loginUserData = await this.userService.loginUser(email, password);
            if (Object.keys(loginUserData).length === 0) {
                throw new ApiError(401, "Invalid credentials")
            }
            const options: CookieOptions = {
                httpOnly: true,
                secure: true
            };
            res
                .cookie("accessToken", loginUserData.accessToken, options)
                .jsonResponse(loginUserData, "login successfully", 200)
        }catch(err){
            this.errorHandler.handleError(err,req,res,null)
        }
    }
}
