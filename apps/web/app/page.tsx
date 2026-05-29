import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";

export const metadata: Metadata = {
  title: "scaffold-stack | Next.js Monorepo Stack Scaffolding Collection",
  description:
    "Instantly configure Next.js monorepos with real-time CLI bash compiler feedback, database integrations, and docker configs.",
};

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <main className="grid-background">
      <div className="blueprint-overlay" />

      {/* Hero Section */}
      <section className="relative z-10 mx-auto flex max-w-7xl flex-1 flex-col items-center justify-center space-y-8 px-6 pt-24 pb-16 text-center lg:px-8">
        <div className="max-w-4xl space-y-4">
          <h1 className="from-foreground via-foreground to-muted-foreground bg-linear-to-r bg-clip-text text-5xl leading-none font-extrabold tracking-tight text-transparent lg:text-7xl">
            The Perfect Next.js Starter.
            <br />
            <span className="gradient-text">Zero Boilerplate. One Command.</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed font-medium lg:text-lg">
            Instantly configure custom environments. Pick package managers, databases, strict
            TypeScript states, ESLint, Prettier, and testing engines. Save presets and execute via
            CLI.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/configure">
            <Button
              size="lg"
              className="font-mono font-bold tracking-wider uppercase transition-all hover:scale-102 active:scale-98"
            >
              Configure Stack
            </Button>
          </Link>
          {session ? (
            <Link href="/collection">
              <Button
                variant="outline"
                size="lg"
                className="border-accent font-mono font-bold tracking-wider uppercase transition-all hover:scale-102 active:scale-95"
              >
                View Collection <ArrowRightIcon weight="bold" />
              </Button>
            </Link>
          ) : (
            <Link href="/signin">
              <Button
                variant="outline"
                size="lg"
                className="border-accent font-mono font-bold tracking-wider uppercase transition-all hover:scale-102 active:scale-95"
              >
                Sign In with GitHub
              </Button>
            </Link>
          )}
        </div>

        {/* CLI Command Shell Mockup */}
        <div className="w-full max-w-3xl pt-8">
          <div className="bg-card/45 border-border/80 ring-border/50 relative overflow-hidden rounded-2xl border p-6 text-left shadow-2xl ring-1 backdrop-blur-md">
            <div className="border-border/40 mb-4 flex items-center gap-1.5 border-b pb-3">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="text-muted-foreground ml-2 font-mono text-xs">Terminal</span>
            </div>
            <div className="text-primary flex items-baseline gap-3 font-mono text-sm leading-relaxed font-bold break-all whitespace-pre-wrap">
              <span className="text-muted-foreground select-none">$</span>
              <span>
                npx @scaffold-stack/cli init my-app --pm=pnpm --db=prisma-postgres --ui=shadcn
                --tsStrict=true
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
