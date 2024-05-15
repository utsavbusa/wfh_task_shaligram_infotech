// mongodb.service.ts

import { injectable } from "inversify";
import { connect } from "mongoose";

@injectable()
export class MongoDBService {
    private db:any;

    async connect(): Promise<void> {
        try {
            const connectionString:string = `${process.env.MONGODB_CLOUD_URL}/${process.env.DB_NAME}`;

            this.db = await connect(connectionString);
            
            console.log("Connected to MongoDB");

        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            throw error;
        }
    }

    getDb() {
        return this.db;
    }
}
