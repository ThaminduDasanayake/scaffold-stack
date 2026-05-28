"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"

export default function SignInButton() {
    const { data: session } = authClient.useSession()

    async function handleSignIn() {
        await authClient.signIn.social({ provider: "github" })
    }

    async function handleSignOut() {
        await authClient.signOut()
        window.location.reload()
    }

    if (session) {
        return (
            <Button
                onClick={handleSignOut}
                variant="destructive"
                size="lg"
            >
                Sign out
            </Button>
        )
    }

    return (
        <Button
            onClick={handleSignIn}
            variant="default"
            size="lg"
        >
            Sign in with GitHub
        </Button>
    )
}