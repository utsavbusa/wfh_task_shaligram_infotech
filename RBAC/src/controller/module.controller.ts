import { Types, UserRole } from "@config";
import { RoleMiddleware } from "@middleware";
import { ModuleService } from "@services";
import { handleError } from "@utils";
import { Request, Response, NextFunction } from "express";
import { validate } from "express-validation";
import { inject } from "inversify";
import { controller, httpPost } from "inversify-express-utils";
import { moduleSchema } from "src/validation";

@controller("/module")
export class ModuleController {

    constructor(
        @inject(Types.ModuleService) private moduleService: ModuleService
    ) { }

    @httpPost('/', Types.AuthMiddleware, validate(moduleSchema.create), RoleMiddleware.roleCheckMiddleware(UserRole.Admin))
    async postRequest(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;

        try {
            const createModule = await this.moduleService.create(name);
            res.jsonResponse(createModule, "Success", 201)
        } catch (error) {
            handleError(error, req, res, next)
        }
    }
}