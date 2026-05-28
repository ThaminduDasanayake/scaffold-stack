import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import SignInButton from "@/components/sign-in-button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export const metadata = {
    title: "Sign In | scaffold-stack",
    description: "Access your account to save monorepo configurations.",
}

export default async function SignInPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (session) {
        redirect("/dashboard")
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(114,255,142,0.06),rgba(255,255,255,0))] relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <Card className="w-full max-w-md border-border bg-card/65 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden ring-1 ring-border text-center p-8 relative z-10">
                <CardHeader className="pb-6">
                    <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                        Welcome Back
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest">
                        Access Your Developer Preset Workspace
                    </p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Sign in via GitHub to save and share stack profiles, retrieve custom bash parameters dynamically, and customize templates instantly.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center pt-4">
                    <SignInButton />
                </CardFooter>
            </Card>
        </div>
    )
}
