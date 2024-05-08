import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';



@injectable()
export class IsAdminMiddleware extends BaseMiddleware {

    handler(req: Request, res: Response, next: NextFunction) {
        if (req.user.role === "Admin") {
            next();
        } else {
            res.jsonResponse(null, "Unauthorized User", 401)
        }
    }
}   