"use client";

import type { StackChoices } from "@scaffold-stack/config-schema";
import { SwitchSection } from "@/components/switch-section";

interface Props {
  choices: StackChoices;
  update: (partial: Partial<StackChoices>) => void;
}

export function SectionQuality({ choices, update }: Props) {
  return (
    <div className="space-y-4">
      {/* ESLint Switch */}
      <SwitchSection
        label="ESLint Verification"
        description="Integrate pluggable linting utility tool rules to find and fix patterns in your code."
        value={choices.eslint}
        onChangeAction={(checked) => update({ eslint: checked })}
        logoPath={`/logos/eslint.svg`}
        logoClassName="size-8!"
      />

      {/* Prettier Switch */}
      <SwitchSection
        label="Prettier Formatting"
        description="Integrate opinionated code formatter support. Automatically formats code on save via prettier.config.mjs rules."
        value={choices.prettier}
        onChangeAction={(checked) => update({ prettier: checked })}
        logoPath={`/logos/prettier.svg`}
        logoClassName="size-8!"
      />
    </div>
  );
}
