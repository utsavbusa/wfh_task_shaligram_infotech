import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

interface CustomRequest extends Request {
    user?: any;
}

@injectable()
export class IsAdminMiddleware {

    public static handler(req: Request, res: Response, next: NextFunction) {
        const customReq = req as CustomRequest;
        if (customReq.user.role === "Admin") {
            next();
        } else {
            res.jsonResponse(null, "Unauthorized User", 401)
        }
    }
}   