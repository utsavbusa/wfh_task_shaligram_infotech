export{}
declare global {
    namespace Express {
        interface Response {
            jsonResponse(data: any,message: string, statusCode?: number): void;
        }
        interface Request {
            user?:any
        }
    }
}