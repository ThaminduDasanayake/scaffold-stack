import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"
import { connectDB } from "@/lib/mongodb"
import { StackConfig } from "@/models/StackConfig"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardList } from "./dashboard-list"

export const metadata = {
    title: "Dashboard | scaffold-stack",
    description: "Manage your saved developer presets and monorepo configurations.",
}

export default async function DashboardPage() {
    await connectDB()
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(114,255,142,0.05),rgba(255,255,255,0))]">
                <Card className="w-full max-w-md border-border bg-card/65 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden ring-1 ring-border text-center p-8">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                            Access Dashboard
                        </CardTitle>
                        <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest">
                            Sign-in required
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Please sign in with your GitHub account to access your saved presets, customize templates, and manage monorepo stacks.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center pt-4">
                        <Link href="/signin">
                            <Button size="lg" className="font-mono font-bold uppercase tracking-wider">
                                Sign In With GitHub
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    // Retrieve configs from MongoDB
    let configs: any[] = []
    try {
        const rawConfigs = await StackConfig.find({ userId: session.user.id }).sort({ updatedAt: -1 })
        configs = rawConfigs.map((config) => ({
            id: config._id.toString(),
            name: config.name,
            description: config.description || "",
            choices: config.choices,
            isDefault: config.isDefault,
            updatedAt: config.updatedAt.toISOString(),
        }))
    } catch (err) {
        console.error("Failed to retrieve presets:", err)
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex-1 w-full">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-border/40 pb-8">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Your Presets</h1>
                    <p className="text-muted-foreground text-sm font-mono mt-2 uppercase tracking-wider">
                        Load, copy, or manage your custom developer workspaces.
                    </p>
                </div>
                <Link href="/configure">
                    <Button variant="default" className="font-mono font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(var(--primary),0.15)]">
                        + Create Preset
                    </Button>
                </Link>
            </div>

            {/* Configs List */}
            {configs.length === 0 ? (
                <div className="text-center py-20 bg-card/20 border border-dashed border-border rounded-2xl p-8 max-w-2xl mx-auto">
                    <span className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-mono font-bold text-lg text-primary mx-auto mb-4">
                        ?
                    </span>
                    <h3 className="text-lg font-bold text-foreground mb-2">No presets saved yet</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto leading-relaxed mb-6">
                        Configure your first stack and save it to compile commands instantly and store them for your next workspaces.
                    </p>
                    <Link href="/configure">
                        <Button variant="outline" className="font-mono font-bold uppercase tracking-wider">
                            Go Configure
                        </Button>
                    </Link>
                </div>
            ) : (
                <DashboardList initialConfigs={configs} />
            )}

        </div>
    )
}
