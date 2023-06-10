import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUser extends mongoose.Document {
    userId: string;
    username: string;
    token: string;
}

export const userSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    }
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;