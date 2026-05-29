"use client";

import type { StackChoices } from "@scaffold-stack/config-schema";
import { FRAMEWORKS, LANGUAGES, PACKAGE_MANAGERS } from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { OptionCard } from "@/components/option-card";
import { SwitchSection } from "@/components/switch-section";

interface Props {
  choices: StackChoices;
  update: (partial: Partial<StackChoices>) => void;
}

export function SectionStack({ choices, update }: Props) {
  return (
    <div className="space-y-8">
      {/* Package Manager */}
      <div>
        <Label className="text-muted-foreground mb-3 block font-mono text-sm tracking-wider uppercase">
          Package Manager
        </Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PACKAGE_MANAGERS.map((pm) => (
            <OptionCard
              key={pm.value}
              label={pm.label}
              description={pm.cmd}
              selected={choices.packageManager === pm.value}
              onClickAction={() => update({ packageManager: pm.value })}
              logoPath={`/logos/${pm.value}.svg`}
              logoClassName={pm.logoClassName}
            />
          ))}
        </div>
      </div>

      {/* Framework */}
      <div>
        <Label className="text-muted-foreground mb-3 block font-mono text-sm tracking-wider uppercase">
          Framework Selection
        </Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {FRAMEWORKS.map((fw) => (
            <OptionCard
              key={fw.value}
              label={fw.label}
              description={fw.description}
              selected={choices.framework === fw.value}
              onClickAction={() => update({ framework: fw.value })}
              logoPath={`/logos/${fw.value === "nextjs" ? "nextjs" : "vite"}.svg`}
              layout="horizontal"
              logoClassName={fw.logoClassName}
            />
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <Label className="text-muted-foreground mb-3 block font-mono text-sm tracking-wider uppercase">
          Development Language
        </Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {LANGUAGES.map((lang) => (
            <OptionCard
              key={lang.value}
              label={lang.label}
              description={lang.description}
              selected={choices.language === lang.value}
              onClickAction={() => update({ language: lang.value })}
              logoPath={`/logos/${lang.value}.svg`}
              layout="horizontal"
              logoClassName={lang.logoClassName}
            />
          ))}
        </div>
      </div>

      {/* Tailwind CSS Switch */}
      <SwitchSection
        label="Tailwind CSS v4"
        description="Include the latest high-performance, utility-first styling engine."
        value={choices.tailwind}
        onChangeAction={(checked) => update({ tailwind: checked })}
        logoPath={`/logos/tailwind.svg`}
      />

      {/* shadcn/ui Switch */}
      <SwitchSection
        label="shadcn/ui"
        description="Include beautifully designed components built with Tailwind CSS and Radix UI."
        value={choices.shadcn}
        onChangeAction={(checked) => update({ shadcn: checked })}
        logoPath={`/logos/shadcn.png`}
      />
    </div>
  );
}
