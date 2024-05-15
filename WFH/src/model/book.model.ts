import mongoose, { Document, Model, Schema } from 'mongoose';


interface IBook extends Document {
    title: string;
    authorId: Schema.Types.ObjectId ;
    categoryId: Schema.Types.ObjectId;
    description: string;
    price: number;
    isbn: string;
}

const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
}, { timestamps: true });

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export {
    Book,
    IBook
}