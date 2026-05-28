"use client"

import { useState } from "react"
import Link from "next/link"
import { generateCommand } from "@/lib/generate-command"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Config {
    id: string
    name: string
    description: string
    choices: any
    isDefault: boolean
    updatedAt: string
}

export function DashboardList({ initialConfigs }: { initialConfigs: Config[] }) {
    const [configs, setConfigs] = useState<Config[]>(initialConfigs)
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    async function handleCopy(id: string, choices: any) {
        const cmd = generateCommand(choices)
        await navigator.clipboard.writeText(cmd)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this preset?")) return
        setDeletingId(id)
        try {
            const res = await fetch(`/api/configs/${id}`, {
                method: "DELETE",
            })
            if (res.ok) {
                setConfigs((prev) => prev.filter((c) => c.id !== id))
            } else {
                alert("Failed to delete configuration.")
            }
        } catch {
            alert("An error occurred. Failed to delete configuration.")
        } finally {
            setDeletingId(null)
        }
    }

    // Helper to get selected badges for visual stack summary
    function getStackBadges(choices: any) {
        const badges: string[] = []
        if (choices.packageManager) badges.push(choices.packageManager)
        if (choices.tailwind) badges.push("Tailwind v4")
        if (choices.tsStrict) badges.push("TS Strict")
        if (choices.eslint && choices.eslint !== "none") badges.push(`ESLint (${choices.eslint})`)
        if (choices.prettier) badges.push("Prettier")
        if (choices.structure) badges.push(`By ${choices.structure}`)
        if (choices.ui && choices.ui !== "none") badges.push(`UI: ${choices.ui}`)
        if (choices.db && choices.db !== "none") badges.push(`DB: ${choices.db}`)
        if (choices.testing && choices.testing !== "none") badges.push(choices.testing)
        if (choices.dockerCompose) badges.push("Docker")
        if (choices.husky) badges.push("Husky")
        return badges
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configs.map((config) => {
                const badges = getStackBadges(config.choices)
                const isCopied = copiedId === config.id
                const isDeleting = deletingId === config.id

                return (
                    <Card 
                        key={config.id} 
                        className="flex flex-col justify-between border border-border/80 bg-card/40 hover:bg-card/70 hover:border-primary/50 rounded-2xl shadow-md transition-all duration-200 duration-300 relative overflow-hidden group ring-1 ring-border/50"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate max-w-[200px]">
                                        {config.name}
                                    </CardTitle>
                                    <p className="text-[10px] text-muted-foreground font-mono mt-1">
                                        UPDATED: {new Date(config.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                {config.isDefault && (
                                    <span className="px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-[9px] font-mono font-bold text-primary">
                                        DEFAULT
                                    </span>
                                )}
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4 flex-1">
                            {/* Description */}
                            {config.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {config.description}
                                </p>
                            )}

                            {/* Stack Badges */}
                            <div className="flex flex-wrap gap-1.5 pt-2">
                                {badges.map((badge) => (
                                    <span 
                                        key={badge}
                                        className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border text-[9px] font-mono font-semibold"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </CardContent>

                        <CardFooter className="border-t border-border/40 p-4 gap-2 bg-black/10">
                            <Link href={`/configure?preset=${config.id}`} className="flex-1">
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full font-mono text-[10px] uppercase border-border hover:bg-accent active:scale-95 transition-all"
                                >
                                    Workspace &rarr;
                                </Button>
                            </Link>
                            
                            <Button
                                onClick={() => handleCopy(config.id, config.choices)}
                                variant="secondary"
                                size="sm"
                                className="font-mono text-[10px] uppercase border border-border active:scale-95 transition-all"
                            >
                                {isCopied ? "Copied!" : "Copy"}
                            </Button>

                            <Button
                                onClick={() => handleDelete(config.id)}
                                disabled={isDeleting}
                                variant="ghost"
                                size="sm"
                                className="font-mono text-[10px] uppercase text-muted-foreground hover:bg-destructive/10 hover:text-destructive active:scale-95 transition-all"
                            >
                                {isDeleting ? "..." : "Delete"}
                            </Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
}
