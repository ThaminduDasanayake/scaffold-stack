'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TechIcon } from '@/components/tech-icon'

export function OptionCard({
  label,
  description,
  selected,
  onClick,
  logoPath,
  fallbackIcon,
  layout = 'vertical',
  className,
}: {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
  logoPath?: string
  fallbackIcon: any
  layout?: 'vertical' | 'horizontal'
  className?: string
}) {
  if (layout === 'horizontal') {
    const Icon = fallbackIcon
    return (
      <Card
        onClick={onClick}
        className={cn(
          'hover:bg-accent/40 ring-offset-background flex cursor-pointer items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98]',
          selected
            ? 'border-primary bg-primary/10 text-foreground ring-primary shadow-primary/10 ring-1'
            : 'border-border text-muted-foreground hover:border-border-hover',
          className
        )}
      >
        {logoPath ? (
          <TechIcon src={logoPath} fallbackIcon={fallbackIcon} alt={label} />
        ) : (
          <Icon className="text-primary mt-0.5 size-6 shrink-0" />
        )}
        <div>
          <p className="text-foreground font-mono text-sm font-bold">{label}</p>
          {description && (
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">{description}</p>
          )}
        </div>
      </Card>
    )
  }

  return (
    <Card
      onClick={onClick}
      className={cn(
        'hover:bg-accent/40 ring-offset-background flex cursor-pointer flex-col justify-between gap-3 rounded-xl border p-4 text-left transition-all duration-200 active:scale-[0.98]',
        selected
          ? 'border-primary bg-primary/10 text-foreground ring-primary shadow-primary/15 ring-1'
          : 'border-border text-muted-foreground hover:border-border-hover',
        className
      )}
    >
      <div className="flex w-full items-center justify-between">
        <TechIcon src={logoPath || ''} fallbackIcon={fallbackIcon} alt={label} />
        {selected && <span className="bg-primary h-1.5 w-1.5 rounded-full" />}
      </div>
      <div>
        <p className="text-foreground font-mono text-sm font-bold">{label}</p>
        {description && (
          <p className="text-muted-foreground mt-1 text-[10px] leading-relaxed font-semibold">
            {description}
          </p>
        )}
      </div>
    </Card>
  )
}
