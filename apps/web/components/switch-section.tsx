"use client";

import { Switch } from "@/components/ui/switch";
import { TechIcon } from "@/components/tech-icon";

export function SwitchSection({
  label,
  description,
  value,
  onChange,
  logoPath,
  icon: Icon,
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (checked: boolean) => void;
  logoPath?: string;
  icon?: any;
}) {
  return (
    <div className="border-border/60 flex items-center justify-between border-t py-4">
      <div className="flex items-start gap-3">
        {logoPath ? (
          <TechIcon src={logoPath} fallbackIcon={Icon} alt={label} />
        ) : (
          <Icon className="text-primary mt-0.5 size-5 shrink-0" />
        )}
        <div>
          <p className="text-foreground text-sm font-bold">{label}</p>
          <p className="text-muted-foreground mt-0.5 text-xs">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground font-mono text-xs font-bold uppercase">
          {value ? "Enabled" : "Disabled"}
        </span>
        <Switch checked={value} onCheckedChange={onChange} />
      </div>
    </div>
  );
}
