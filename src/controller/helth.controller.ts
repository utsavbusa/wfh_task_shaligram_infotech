import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";

@controller("/health")
export class HealthController {
    @httpGet("/")
    async checkHealth(req: Request, res: Response): Promise<void> {
        try {

            res.status(200).json({ status: "Server is running" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
