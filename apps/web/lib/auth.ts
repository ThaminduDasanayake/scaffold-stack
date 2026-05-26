// import { betterAuth } from "better-auth"
// import { mongodbAdapter } from "better-auth/adapters/mongodb"
// import mongoose from "mongoose"
// import { connectDB } from "./mongodb"
//
// await connectDB()
//
// export const auth = betterAuth({
//     database: mongodbAdapter(mongoose.connection.db!),
//     socialProviders: {
//         github: {
//             clientId: process.env.AUTH_GITHUB_ID!,
//             clientSecret: process.env.AUTH_GITHUB_SECRET!,
//         },
//     },
// })