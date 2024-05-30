import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import { ResponseMiddleware } from "@middleware";
import { Types, container, databaseConnect } from "@config";

const app = express();

const server = new InversifyExpressServer(container);


server.setConfig((app)=>{
    app.use(express.json())
    app.use(cookieParser())
})

const appInstance = server.build();

app.use((req:Request,res:Response,next:NextFunction)=>{
    container.get<ResponseMiddleware>(Types.ResponseMiddleware).handle(req,res,next)
})
app.use("/api/v1",appInstance)

// app.use(handleError)
const port = process.env.PORT ?? 4000

app.listen(port,()=>{
    console.log(`server is running url http://localhost:${port}/api/v1`)
});

// mongodb connection
databaseConnect()
    .then(()=>{
        console.log("Database connection successfully!")
    })
    .catch((error)=>{
        console.log(`Faild to connect to the database `,error)
    });

