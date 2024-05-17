import { Types, UserRole } from "@config";
import { RoleMiddleware } from "@middleware";
import { RoleService } from "@services";
import { handleError } from "@utils";
import { Request, Response, NextFunction } from "express";
import { validate } from "express-validation";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { roleSchema } from "src/validation";

@controller("/role")
export class RoleController {

    constructor(
        @inject(Types.RoleService) private roleService: RoleService
    ) { }

    @httpPost("/", Types.AuthMiddleware, RoleMiddleware.roleCheckMiddleware(UserRole.Admin), validate(roleSchema.create))
    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {

            const { name } = req.body

            const role:any = await this.roleService.create(name)
            role.isDeleted = undefined

            res.jsonResponse(role, "Success create role", 201)

        } catch (error) {
            handleError(error, req, res, next)
        }
    }


    @httpPut("/:id", Types.AuthMiddleware, RoleMiddleware.roleCheckMiddleware(UserRole.Admin), validate(roleSchema.update))
    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const update:any     = await this.roleService.update(id, name)
            update.isDeleted = undefined

            res.jsonResponse(update, "Successfuly update role", 201)

        } catch (error) {
            handleError(error, req, res, next)
        }
    }


    @httpDelete("/:id", Types.AuthMiddleware, RoleMiddleware.roleCheckMiddleware(UserRole.Admin), validate(roleSchema.delete))
    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await this.roleService.delete(id)
            res.jsonResponse({}, "Success fully delete role", 200)
        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpGet("/", Types.AuthMiddleware)
    async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            
            const role = await this.roleService.get();

            res.jsonResponse(role,"success",201)

        } catch (error) {
            handleError(error, req, res, next)
        }
    }
}