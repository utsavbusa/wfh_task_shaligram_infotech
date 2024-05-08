import mongoose, { Document, Model, Schema } from 'mongoose';

interface ICategory extends Document {
    name: string;
}

const categorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true }
},{timestamps: true});

const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);

export {
    Category,
    ICategory
}
