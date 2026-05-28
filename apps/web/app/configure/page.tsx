import { Configurator } from '@/components/configurator/configurator'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import { StackConfig } from '@/models/StackConfig'

export default async function ConfigurePage({
  searchParams,
}: {
  searchParams: Promise<{ preset?: string }>
}) {
  await connectDB()
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const params = await searchParams
  let initialChoices = undefined

  if (session) {
    if (params.preset) {
      try {
        const config = await StackConfig.findOne({
          _id: params.preset,
          userId: session.user.id,
        })
        if (config) {
          initialChoices = config.choices
        }
      } catch (err) {
        console.error('Failed to load preset:', err)
      }
    } else {
      // Fallback to latest updated config of the user
      try {
        const latestConfig = await StackConfig.findOne({
          userId: session.user.id,
        }).sort({ updatedAt: -1 })
        if (latestConfig) {
          initialChoices = latestConfig.choices
        }
      } catch (err) {
        console.error('Failed to load default preset:', err)
      }
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      {/* Header section with grid lines */}
      <div className="mb-14 relative pb-8 border-b border-border/40">
        <div className="absolute -left-10 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent hidden xl:block" />
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Configure your monorepo stack
        </h1>
        <p className="text-muted-foreground text-sm font-mono mt-3 max-w-2xl leading-relaxed uppercase tracking-wider">
          Pick your preferences. View your command update in real-time. Zero boilerplate required.
        </p>
        {initialChoices && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-mono font-bold text-primary animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            PRESET LOADED ACTIVE
          </div>
        )}
      </div>

      {/* Configurator Workspace */}
      <Configurator isSignedIn={!!session} initialChoices={initialChoices as any} />
    </div>
  )
}
