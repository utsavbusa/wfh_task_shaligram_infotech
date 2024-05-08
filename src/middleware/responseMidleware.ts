import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";


declare global {
    namespace Express {
        interface Response {
            jsonResponse(data: any,message: string, statusCode?: number): void;
        }
        interface Request{
            user?:any
        }
    }
}

@injectable()
export class ResponseMiddleware {
    handle(req: Request, res: Response, next: NextFunction): void {
        res.jsonResponse = function (data: any,message: string, statusCode: number = 200) {
            res.status(statusCode).json({data,statusCode,message,success:statusCode < 400});
        };

        next();
    }
}
