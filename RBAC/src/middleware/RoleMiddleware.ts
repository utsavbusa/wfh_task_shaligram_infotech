import { Request, Response, NextFunction } from 'express';




export class RoleMiddleware {
    public static roleCheckMiddleware(allowedRole: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            
            if (req.user.role === allowedRole) {
                next();
            } else {
                res.jsonResponse(null, "Unauthorizedone  User", 401)
            }
        };
    }
}   