import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
    githubId: string
    username: string
    email?: string
    avatar?: string
    createdAt: Date
}

const UserSchema = new Schema<IUser>({
    githubId:  { type: String, required: true, unique: true },
    username:  { type: String, required: true },
    email:     { type: String },
    avatar:    { type: String },
    createdAt: { type: Date, default: Date.now },
})

export const User =
    mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema)