import {Request,Response, NextFunction } from "express";
import {controller,httpGet} from "inversify-express-utils"

@controller("/health")
export class HealthController{

    @httpGet("/")
    async getApi(req:Request,res:Response,next:NextFunction){
        res.jsonResponse(null,"server is running fine",200)
    }
}