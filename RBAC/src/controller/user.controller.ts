import { Types, UserRole } from "@config";
import { RoleMiddleware } from "@middleware";
import { type IUserService } from "@services";
import { handleError } from "@utils";
import { Request, Response, NextFunction } from "express";
import { validate } from "express-validation";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { userSchema } from "@validation";


interface CookieOptions {
    httpOnly: boolean;
    secure: boolean;
}

const options: CookieOptions = {
    httpOnly: true,
    secure: true
};

@controller('/user')
export class UserController {

    constructor(@inject(Types.UserService)
    private userService: IUserService
    ) { }

    @httpPut('/role', Types.AuthMiddleware, RoleMiddleware.roleCheckMiddleware([UserRole.Admin]), validate(userSchema.roleChagne))
    async roleChange(req: Request, res: Response, next: NextFunction) {
        try {
            const { roleId, userId } = req.body
            await this.userService.rolechange(userId, roleId);
            res.jsonResponse({}, "role change succsessfully")
        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpPost("/register", validate(userSchema.create))
    async registerUser(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, phone } = req.body
        try {

            const user = await this.userService.create({ name, email, password, phone })

            res
                .cookie("accessToken", user.accessToken, options)
                .jsonResponse(user, "successfully created user", 201);

        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpPost('/login')
    async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            const user = await this.userService.login(email, password)

            res
                .cookie("accessToken", user.accessToken, options)
                .jsonResponse(user, "successfully Login user", 201);

        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpPut('/:id', Types.AuthMiddleware, validate(userSchema.update), RoleMiddleware.roleCheckMiddleware([UserRole.Admin]))
    async putRequest(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        try {
            const user = await this.userService.update({ id, ...req.body })

            res.jsonResponse(user, "success", 201)

        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpPut('/update', validate(userSchema.update), Types.AuthMiddleware)
    async userUpdate(req: Request, res: Response, next: NextFunction) {
        const id = req.user._id

        try {
            const user = await this.userService.update({ id, ...req.body })

            res.jsonResponse(user, "success", 201)

        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpDelete("/delete/:id", Types.AuthMiddleware, RoleMiddleware.roleCheckMiddleware([UserRole.Admin]))
    async deleteRequest(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            await this.userService.delete(id)
            res.jsonResponse({}, "successfully deleted user", 200)
        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpGet("/", Types.AuthMiddleware, RoleMiddleware.roleCheckMiddleware([UserRole.Admin]), validate(userSchema.search))
    async getRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, page, limit } = req.query;
            const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
            const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : 10;
            const userList = await this.userService.getUser({
                name: name as string
                ,
                page: pageNumber
                ,
                limit: limitNumber
            })

            res.jsonResponse(userList, "success", 201)

        } catch (error) {
            handleError(error, req, res, next)
        }
    }



}