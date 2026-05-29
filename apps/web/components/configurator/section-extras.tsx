'use client'

import type { StackChoices } from '@scaffold-stack/config-schema'
import { DATABASE_ORMS } from '@/lib/constants'
import { OptionCard } from '@/components/option-card'
import { Label } from '@/components/ui/label'

interface Props {
  choices: StackChoices
  update: (partial: Partial<StackChoices>) => void
}

export function SectionExtras({ choices, update }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-muted-foreground mb-3 block font-mono text-sm uppercase tracking-wider">
          Database Connection / ORM selection
        </Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {DATABASE_ORMS.map((db) => (
            <OptionCard
              key={db.value}
              label={db.label}
              description={db.description}
              selected={choices.db === db.value}
              onClick={() => update({ db: db.value })}
              logoPath={db.logoPath}
              fallbackIcon={db.fallbackIcon}
              logoClassName={db.logoClassName}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
