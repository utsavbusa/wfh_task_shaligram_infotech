import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { ApiError } from "../utils/ApiError";
import errorCode from "../config/errorCode";

@injectable()
export class ErrorHandler {
    handleError(error: any, req: Request, res: Response, next: NextFunction | null): void {
        if (error instanceof ApiError) {
            res.status(error.statusCode || 500).json({ statusCode: error.statusCode || 500, error: error.message });
        } else {
            if(error.code === 11000){
                res.status(400).json({ statusCode: 400, error: errorCode.DUPLICATE_KEY_VALUE.body.message });
                return ;
            }
            res.status(500).json({ statusCode: 500, error: error.errmsg });
        }
    }
}
