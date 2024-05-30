import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '@utils';
import { BaseMiddleware } from 'inversify-express-utils';
import { UserModel } from '@model';
import mongoose from 'mongoose';


@injectable()
export class AuthMiddleware extends BaseMiddleware {

    async handler(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let token: string | undefined = req.cookies?.accessToken || req.header('Authorization')?.replace("Bearer ", "");
            if (!token) {
                throw new ApiError(401, "Unauthorized request: No token provided");
            }

            // Verify token
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;

            if (!decodedToken) {
                throw new ApiError(401, "Unauthorized request: Invalid token");
            }

            // Optionally check token expiration or other properties
            if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
                throw new ApiError(401, "Unauthorized request: Token expired");
            }
            const userRole: any = await UserModel.aggregate([
                {
                    $match: {
                        _id:new mongoose.Types.ObjectId(decodedToken._id as string)
                    }
                },
                {
                    $lookup: {
                        from: 'roles',
                        localField: 'roleId',
                        foreignField: '_id',
                        as: 'role'
                    }
                },
                {
                    $unwind: "$role"
                },
                {
                    $addFields: {
                        roleName: "$role.name"
                    }
                }
            ])

            if (!(userRole.length) || !(userRole[0].roleName)) {
                throw Error
            }
            req.user = {...decodedToken,role:userRole[0].roleName}
            next();

        } catch (error:any) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({ statusCode: 401, message: "Unauthorized request: Token expired" });
            } else if (error instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ statusCode: 401, message: "Unauthorized request: Invalid token" });
            } else {
                res.status(401).json({ statusCode: 401, message:"Unauthorized user" });
            }
        }
    }
}
