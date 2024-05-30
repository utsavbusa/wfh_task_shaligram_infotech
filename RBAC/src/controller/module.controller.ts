import { Types, UserRole } from "@config";
import { RoleMiddleware } from "@middleware";
import { ModuleService } from "@services";
import { handleError } from "@utils";
import { Request, Response, NextFunction } from "express";
import { validate } from "express-validation";
import { inject } from "inversify";
import { controller, httpDelete, httpPost, httpPut } from "inversify-express-utils";
import { moduleSchema } from "@validation";

@controller("/module")
export class ModuleController {

    constructor(
        @inject(Types.ModuleService) private moduleService: ModuleService
    ) { }

    @httpPost('/', Types.AuthMiddleware, validate(moduleSchema.create), RoleMiddleware.roleCheckMiddleware([UserRole.Admin]))
    async postRequest(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;

        try {
            const createModule = await this.moduleService.create(name);
            res.jsonResponse(createModule, "Success", 201)
        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpPut('/:id', Types.AuthMiddleware, validate(moduleSchema.update), RoleMiddleware.roleCheckMiddleware([UserRole.Admin]))
    async putRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            const updatedModule = await this.moduleService.update(id, name)

            res.jsonResponse(updatedModule, "Successfully updated", 201)

        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpDelete("/:id", Types.AuthMiddleware, validate(moduleSchema.delete), RoleMiddleware.roleCheckMiddleware([UserRole.Admin]))
    async deleteRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params

            await this.moduleService.delete(id);

            res.jsonResponse({}, "SuccessFully deleted module", 200)
        } catch (error) {

        }
    }
}