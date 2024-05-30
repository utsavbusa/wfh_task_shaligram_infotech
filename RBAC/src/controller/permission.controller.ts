import { Types, UserRole } from "@config";
import { RoleMiddleware } from "@middleware";
import { PermissionService } from "@services";
import { handleError } from "@utils";
import { Request, Response, NextFunction } from "express";
import { validate } from "express-validation";
import { inject } from "inversify";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { permissionSchema } from "@validation";

interface IPermission{
    read:boolean
    write:boolean
    update:boolean
    delete:boolean
}
interface IUPermission{
    moduleId:string
    permission:IPermission
}
interface IUPData{
    roleId:string,
    data:IUPermission[]
}
@controller("/permission")
export class PermissionController {

    constructor(
        @inject(Types.PermissionService) private prmissionService: PermissionService
    ) { }

    @httpGet("/", Types.AuthMiddleware, validate(permissionSchema.get))
    async getRequest(req: Request, res: Response, next: NextFunction) {
        try {
            const { roleId, name, page, limit } = req.query;
            const pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
            const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : 10;
            const serachSersult = await this.prmissionService.getModule({
                userRole: req.user.role,
                page: pageNumber,
                limit: limitNumber,
                name: name as string,
                roleId: roleId as string
            })

            res.jsonResponse(serachSersult, "successfully search ", 201)
        } catch (error) {
            handleError(error, req, res, next)
        }
    }

    @httpPost("/", Types.AuthMiddleware, RoleMiddleware.roleCheckMiddleware([UserRole.Admin]),validate(permissionSchema.update))
    async postRequers(req: Request, res: Response, next: NextFunction) {
        try {
            const data:IUPData = req.body

            await this.prmissionService.update(data)
            res.jsonResponse({},"successfully permission update",200)
        } catch (error) {
            handleError(error, req, res, next)
        }
    }
}