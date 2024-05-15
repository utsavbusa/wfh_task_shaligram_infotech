import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { BaseMiddleware } from 'inversify-express-utils';

@injectable()
export class AuthMiddleware extends BaseMiddleware {

    handler(req: Request, res: Response, next: NextFunction): void {
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

            // Set user on request
            req.user = decodedToken;
            next();

        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                res.status(401).json({ statusCode: 401, message: "Unauthorized request: Token expired" });
            } else if (error instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ statusCode: 401, message: "Unauthorized request: Invalid token" });
            } else {
                res.status(401).json({ statusCode: 401, message: "Unauthorized request" });
            }
        }
    }
}
