import "reflect-metadata";
import express , { Request, Response, NextFunction }  from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import container from "./config/inversify.config";
import dotenv from 'dotenv';
dotenv.config();
import { MongoDBService } from "./services/mongodb.service";
import cookieParser from 'cookie-parser';
import { ResponseMiddleware } from "./middleware/responseMidleware";
const app = express();

const server = new InversifyExpressServer(container);

const mongoDBService = container.resolve<MongoDBService>(MongoDBService);



server.setConfig((app) => {
    app.use(express.json());
    app.use(cookieParser());
});

const appInstance = server.build();
app.use((req: Request, res: Response, next: NextFunction) => {
    container.get<ResponseMiddleware>(ResponseMiddleware).handle(req, res, next);
});


app.use("/api/v1", appInstance);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

mongoDBService.connect()