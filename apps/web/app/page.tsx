import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'scaffold-stack | Next.js Monorepo Stack Scaffolding Dashboard',
  description:
    'Instantly configure Next.js monorepos with real-time CLI bash compiler feedback, database integrations, and docker configs.',
}

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // const features = [
  //     {
  //         title: "Real-Time Bash CLI",
  //         description: "No slow multi-step forms. A single-page dashboard updates your custom initialization bash command in real-time as you pick parameters.",
  //         icon: "⚡"
  //     },
  //     {
  //         title: "Obsidian Presets Cloud",
  //         description: "Sign in with GitHub to save, explore, and share custom developer stack profiles for your SaaS, personal boilerplate, or team projects.",
  //         icon: "☁️"
  //     },
  //     {
  //         title: "Modern Tech Only",
  //         description: "Pre-wired with Tailwind v4, TypeScript strict parameters, ESM formats, fast pnpm workspaces, and modern schema validations out of the box.",
  //         icon: "🚀"
  //     },
  //     {
  //         title: "Fully Integrated Extras",
  //         description: "Select Prisma, Drizzle, Mongoose, Shadcn/ui, Radix, Vitest testing suites, Husky hook configurations, and Docker-Compose in one tap.",
  //         icon: "📦"
  //     }
  // ]

  return (
    <main className="flex-1 flex flex-col bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(114,255,142,0.08),rgba(255,255,255,0))] relative overflow-hidden">
      {/* Visual Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_65%_50%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16 text-center space-y-8 relative z-10 flex-1 flex flex-col justify-center items-center">
        <div className="max-w-4xl space-y-4">
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            The Perfect Next.js Starter.
            <br />
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Zero Boilerplate. One Command.
            </span>
          </h1>
          <p className="text-muted-foreground text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Instantly configure custom environments. Pick package managers, databases, strict
            TypeScript states, ESLint, Prettier, and testing engines. Save presets and execute via
            CLI.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Link href="/configure">
            <Button
              size="lg"
              className="font-mono font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] hover:scale-102 active:scale-98 transition-all"
            >
              Configure Stack
            </Button>
          </Link>
          {session ? (
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="font-mono font-bold uppercase tracking-wider border-border hover:bg-accent active:scale-95 transition-all"
              >
                Your Presets &rarr;
              </Button>
            </Link>
          ) : (
            <Link href="/signin">
              <Button
                variant="outline"
                size="lg"
                className="font-mono font-bold uppercase tracking-wider border-border hover:bg-accent active:scale-95 transition-all"
              >
                Sign In with GitHub
              </Button>
            </Link>
          )}
        </div>

        {/* CLI Command Shell Mockup */}
        <div className="w-full max-w-3xl pt-8">
          <div className="bg-card/45 border border-border/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden ring-1 ring-border/50 text-left">
            <div className="flex items-center gap-1.5 mb-4 border-b border-border/40 pb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="text-[10px] text-muted-foreground font-mono ml-2 uppercase tracking-widest">
                terminal — init scaffold
              </span>
            </div>
            <div className="flex items-center gap-3 font-mono text-sm leading-relaxed whitespace-pre-wrap break-all text-primary font-bold">
              <span className="text-muted-foreground select-none">$</span>
              <span>
                npx @scaffold-stack/cli init my-app --pm=pnpm --db=prisma-postgres --ui=shadcn
                --tsStrict=true
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase Section */}
      {/*<section className="border-t border-border/40 bg-black/10 py-24 relative z-10">*/}
      {/*    <div className="max-w-7xl mx-auto px-6 lg:px-8">*/}
      {/*        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">*/}
      {/*            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">*/}
      {/*                Engineered for High-Velocity Scaffolding*/}
      {/*            </h2>*/}
      {/*            <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">*/}
      {/*                Stripped of AI bloat, optimized for reliable code standards.*/}
      {/*            </p>*/}
      {/*        </div>*/}

      {/*        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">*/}
      {/*            {features.map((feature) => (*/}
      {/*                <Card */}
      {/*                    key={feature.title}*/}
      {/*                    className="bg-card/30 border border-border/60 hover:border-primary/45 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative group overflow-hidden"*/}
      {/*                >*/}
      {/*                    <CardHeader className="flex flex-row items-center gap-4 pb-2">*/}
      {/*                        <span className="text-3xl p-3 bg-secondary border border-border rounded-xl group-hover:scale-110 transition-transform">*/}
      {/*                            {feature.icon}*/}
      {/*                        </span>*/}
      {/*                        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">*/}
      {/*                            {feature.title}*/}
      {/*                        </CardTitle>*/}
      {/*                    </CardHeader>*/}
      {/*                    <CardContent className="pt-4">*/}
      {/*                        <p className="text-xs text-muted-foreground leading-relaxed">*/}
      {/*                            {feature.description}*/}
      {/*                        </p>*/}
      {/*                    </CardContent>*/}
      {/*                </Card>*/}
      {/*            ))}*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</section>*/}
    </main>
  )
}
