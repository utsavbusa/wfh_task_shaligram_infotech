import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";

@injectable()
export class ResponseMiddleware {
    handle(req: Request, res: Response, next: NextFunction): void {
        res.jsonResponse = function (data: any, message: string, statusCode: number = 200) {
            if (data) res.status(statusCode).json({ data, statusCode, message, success: statusCode < 400 });
            res.status(statusCode).json({ statusCode, message, success: statusCode < 400 });
        };

        next();
    }
}