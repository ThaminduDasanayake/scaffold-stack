import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { StackConfig } from "@/models/StackConfig";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardList } from "./dashboard-list";
import { Metadata } from "next";
import { StackIcon } from "@phosphor-icons/react/ssr";
import SignInButton from "@/components/sign-in-button";

export const metadata: Metadata = {
  title: "Dashboard | scaffold-stack",
  description: "Manage your saved developer presets and monorepo configurations.",
};

export default async function DashboardPage() {
  await connectDB();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="grid-background items-center justify-center p-6">
        <div className="blueprint-overlay" />

        <Card className="border-border ring-border relative z-10 w-full max-w-lg overflow-hidden text-center shadow-2xl backdrop-blur-lg">
          <CardHeader className="flex flex-col items-center pt-8 pb-4">
            <div className="border-border bg-accent/20 mb-4 rounded-xl border p-2.5 shadow-sm">
              <StackIcon weight="duotone" className="text-primary size-6 animate-pulse" />
            </div>
            <CardTitle className="gradient-text text-3xl font-extrabold">
              Access Dashboard
            </CardTitle>
            <p className="text-muted-foreground mt-2 font-mono text-xs tracking-widest uppercase">
              Sign-in required
            </p>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
              Please sign in with your GitHub account to access your saved presets, customize
              templates, and manage monorepo stacks.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <SignInButton />
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Retrieve configs from MongoDB
  let configs: any[] = [];
  try {
    const rawConfigs = await StackConfig.find({ userId: session.user.id }).sort({ updatedAt: -1 });
    configs = rawConfigs.map((config) => ({
      id: config._id.toString(),
      name: config.name,
      description: config.description || "",
      choices: config.choices,
      isDefault: config.isDefault,
      updatedAt: config.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.error("Failed to retrieve presets:", err);
  }

  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="border-border/40 mb-12 flex flex-col justify-between gap-6 border-b pb-8 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Your Presets</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm tracking-wider uppercase">
            Load, copy, or manage your custom developer workspaces.
          </p>
        </div>
        <Link href="/configure">
          <Button
            variant="default"
            className="font-mono font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(var(--primary),0.15)]"
          >
            + Create Preset
          </Button>
        </Link>
      </div>

      {/* Configs List */}
      {configs.length === 0 ? (
        <div className="bg-card/20 border-border mx-auto max-w-2xl rounded-2xl border border-dashed p-8 py-20 text-center">
          <span className="bg-primary/10 border-primary/20 text-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border font-mono text-lg font-bold">
            ?
          </span>
          <h3 className="text-foreground mb-2 text-lg font-bold">No presets saved yet</h3>
          <p className="text-muted-foreground mx-auto mb-6 max-w-sm text-sm leading-relaxed">
            Configure your first stack and save it to compile commands instantly and store them for
            your next workspaces.
          </p>
          <Link href="/configure">
            <Button variant="outline" className="font-mono font-bold tracking-wider uppercase">
              Go Configure
            </Button>
          </Link>
        </div>
      ) : (
        <DashboardList initialConfigs={configs} />
      )}
    </div>
  );
}
