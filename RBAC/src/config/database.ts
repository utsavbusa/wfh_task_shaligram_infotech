import mongoose from "mongoose";

export async function databaseConnect(): Promise<void> {
    try {
        const connectionString: string = `${process.env.MONGODB_LOCAL_URL}/${process.env.DB_NAME}`;
        console.log(connectionString)
        await mongoose.connect(connectionString);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        // console.error("Error connecting to MongoDB:", error);
        throw error; 
    }
}
