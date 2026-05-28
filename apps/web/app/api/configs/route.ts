import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { StackConfig } from "@/models/StackConfig"

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        
        // Get user session
        const session = await auth.api.getSession({
            headers: req.headers,
        })
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { name, choices } = await req.json()
        if (!name || !choices) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        // Save preset
        const config = await StackConfig.create({
            userId: session.user.id,
            name,
            choices,
            isDefault: false,
        })

        return NextResponse.json({ success: true, id: config._id }, { status: 201 })
    } catch (err: any) {
        console.error("POST /api/configs error:", err)
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 })
    }
}

export async function GET(req: NextRequest) {
    try {
        await connectDB()

        // Get user session
        const session = await auth.api.getSession({
            headers: req.headers,
        })
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const configs = await StackConfig.find({ userId: session.user.id }).sort({ updatedAt: -1 })
        return NextResponse.json(configs)
    } catch (err: any) {
        console.error("GET /api/configs error:", err)
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 })
    }
}
