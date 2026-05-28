import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/mongodb"
import { StackConfig } from "@/models/StackConfig"

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB()

        // Get user session
        const session = await auth.api.getSession({
            headers: req.headers,
        })
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        if (!id) {
            return NextResponse.json({ error: "Missing config ID" }, { status: 400 })
        }

        // Delete from database
        const result = await StackConfig.deleteOne({
            _id: id,
            userId: session.user.id,
        })

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Configuration not found" }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (err: any) {
        console.error("DELETE /api/configs/[id] error:", err)
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 })
    }
}
