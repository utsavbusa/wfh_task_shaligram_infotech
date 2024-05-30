import { Request, Response, NextFunction } from 'express';

export class RoleMiddleware {
    public static roleCheckMiddleware(allowedRole: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            if (allowedRole.includes(req.user.role)) {
                next();
            } else {
                res.jsonResponse(null, "Unauthorizedone  User", 401)
            }
        };
    }
}   