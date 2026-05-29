import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SignInButton from "@/components/sign-in-button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { StackIcon } from "@phosphor-icons/react/ssr";

export const metadata: Metadata = {
  title: "Sign In | scaffold-stack",
  description: "Access your account to save monorepo configurations.",
};

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/collection");
  }

  return (
    <div className="grid-background items-center justify-center p-6">
      <div className="blueprint-overlay" />

      <Card className="border-border ring-border relative z-10 w-full max-w-lg overflow-hidden text-center shadow-2xl backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center pt-8 pb-4">
          <div className="border-border bg-accent/20 mb-4 rounded-xl border p-2.5 shadow-sm">
            <StackIcon weight="duotone" className="text-primary size-6 animate-pulse" />
          </div>
          <CardTitle className="gradient-text text-3xl font-extrabold">Welcome Back</CardTitle>
          <p className="text-muted-foreground mt-2 font-mono text-xs tracking-widest uppercase">
            Access Your Developer Preset Workspace
          </p>
        </CardHeader>
        <CardContent className="px-6 pb-4">
          <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
            Sign in via GitHub to save and share stack profiles, retrieve custom bash parameters
            dynamically, and customize templates instantly.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <SignInButton />
        </CardFooter>
      </Card>
    </div>
  );
}
