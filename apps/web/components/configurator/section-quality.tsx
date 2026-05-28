'use client'

import type { StackChoices } from '@scaffold-stack/config-schema'
import { ShieldCheck, Palette } from '@phosphor-icons/react'
import { SwitchSection } from '@/components/switch-section'

interface Props {
  choices: StackChoices
  update: (partial: Partial<StackChoices>) => void
}

export function SectionQuality({ choices, update }: Props) {
  return (
    <div className="space-y-4">
      {/* ESLint Switch */}
      <SwitchSection
        label="ESLint Verification"
        description="Integrate pluggable linting utility tool rules to find and fix patterns in your code."
        value={choices.eslint}
        onChange={(checked) => update({ eslint: checked })}
        icon={ShieldCheck}
      />

      {/* Prettier Switch */}
      <SwitchSection
        label="Prettier Formatting"
        description="Integrate opinionated code formatter support. Automatically formats code on save via prettier.config.mjs rules."
        value={choices.prettier}
        onChange={(checked) => update({ prettier: checked })}
        icon={Palette}
      />
    </div>
  )
}
