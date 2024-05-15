import { ApiError } from "./Api.error";
import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validation";
import logger from "@lib";




const convertValidationError = (err:any) => {
    const errors:any = [];
    Object.keys(err.details).forEach((location) => {
        err.details[location].forEach((e:any) => { errors.push({ location, messages: [e.message], field: e.path[0] }); });
    });
    return {
        httpStatusCode: err.statusCode,
        body: { code: 'validation_error', message: 'parameters are not valid', errors },
    };
};

function handleError(error: any, req: Request, res: Response, next: NextFunction
): void {
        if(error instanceof ApiError){
            logger.error({ message: 'api error', stack: JSON.stringify(error.message) })
            res.status(error.statusCode).json({success:error.success,message:error.message})
            return;
        }
        if (error instanceof ValidationError) {
            const validateErorObj = convertValidationError(error);
            logger.error({ message: 'ValidationError', stack: JSON.stringify(validateErorObj.body.errors) })
            res.status(validateErorObj.httpStatusCode).json(validateErorObj.body);
            return;
        }
        res.status(500).json({success:false, message: error.message });
    
}
export { handleError }