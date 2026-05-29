import { Configurator } from "@/components/configurator/configurator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/mongodb";
import { StackConfig } from "@/models/StackConfig";

export default async function ConfigurePage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string }>;
}) {
  await connectDB();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const params = await searchParams;
  let initialChoices = undefined;

  if (session) {
    if (params.preset) {
      try {
        const config = await StackConfig.findOne({
          _id: params.preset,
          userId: session.user.id,
        });
        if (config) {
          initialChoices = config.choices;
        }
      } catch (err) {
        console.error("Failed to load preset:", err);
      }
    } else {
      // Fallback to latest updated config of the user
      try {
        const latestConfig = await StackConfig.findOne({
          userId: session.user.id,
        }).sort({ updatedAt: -1 });
        if (latestConfig) {
          initialChoices = latestConfig.choices;
        }
      } catch (err) {
        console.error("Failed to load default preset:", err);
      }
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* Header section with grid lines */}
      <div className="border-border/40 relative mb-14 border-b pb-8">
        <h1 className="from-foreground to-accent w-fit bg-linear-to-r bg-clip-text py-2 text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl">
          Configure your monorepo stack
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl font-mono text-sm leading-relaxed tracking-wider uppercase">
          Pick your preferences. View your command update in real-time. Zero boilerplate required.
        </p>
        {initialChoices && (
          <div className="bg-primary/10 border-primary/20 text-primary mt-4 inline-flex animate-pulse items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold">
            <span className="bg-primary h-1.5 w-1.5 rounded-full" />
            PRESET LOADED ACTIVE
          </div>
        )}
      </div>

      {/* Configurator Workspace */}
      <Configurator isSignedIn={!!session} initialChoices={initialChoices as any} />
    </div>
  );
}
