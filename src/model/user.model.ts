import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    bio: string;
    nationlity: string;
    role: string;
}

const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bio: { type: String },
    nationlity: { type: String },
    role: { type: String, default: 'user' }
}, { timestamps: true });

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export {
    User,
    IUser
}
