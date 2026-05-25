import mongoose, { Schema, type Document } from "mongoose"

export interface IStackConfig extends Document {
    userId: string
    name: string
    description?: string
    isDefault: boolean
    choices: Record<string, unknown>
    createdAt: Date
    updatedAt: Date
}

const StackConfigSchema = new Schema<IStackConfig>(
    {
        userId:      { type: String, required: true, index: true },
        name:        { type: String, required: true },
        description: { type: String },
        isDefault:   { type: Boolean, default: false },
        choices:     { type: Schema.Types.Mixed, required: true },
    },
    { timestamps: true }
)

export const StackConfig =
    mongoose.models.StackConfig ??
    mongoose.model<IStackConfig>("StackConfig", StackConfigSchema)