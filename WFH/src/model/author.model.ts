import mongoose, { Document, Model, Schema } from 'mongoose';

interface IAuthor extends Document {
    name: string;
    bio: string;
    nationality: string;
}

const authorSchema: Schema<IAuthor> = new Schema({
    name: { type: String, required: true },
    bio: { type: String,required:true },
    nationality: { type: String,required:true }
}, { timestamps: true });

const Author: Model<IAuthor> = mongoose.model<IAuthor>('Author', authorSchema);

export {
    Author,
    IAuthor
}