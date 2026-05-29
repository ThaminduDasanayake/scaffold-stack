"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TechIcon } from "@/components/tech-icon";
import { Icon } from "@phosphor-icons/react";

export function OptionCard({
  label,
  description,
  selected,
  onClick,
  logoPath,
  fallbackIcon,
  layout = "vertical",
  className,
  logoClassName,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  logoPath?: string;
  fallbackIcon?: any;
  layout?: "vertical" | "horizontal";
  className?: string;
  logoClassName?: string;
}) {
  const interactiveStyles = cn(
    "bg-accent/50 dark:bg-card cursor-pointer text-left ring-0 ring-2 transition-colors duration-200",
    selected
      ? [
          "ring-accent",
          "bg-primary dark:bg-primary/40",
          "text-primary-foreground dark:text-foreground",
        ]
      : ["ring-primary", "hover:bg-accent/60 dark:hover:bg-card/80", "hover:ring-primary/80"],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  if (layout === "horizontal") {
    return (
      <Card
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        className={cn(interactiveStyles, className)}
      >
        <CardContent className="space-y-4">
          <TechIcon
            src={logoPath || ""}
            fallbackIcon={fallbackIcon}
            alt={label}
            className={logoClassName}
          />
          <div>
            <p className="font-mono text-sm font-bold">{label}</p>
            {description && (
              <p
                className={cn(
                  !selected && "text-muted-foreground",
                  "mt-1 text-xs leading-relaxed font-semibold",
                )}
              >
                {description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={cn(interactiveStyles, className)}
    >
      <CardContent className="space-y-3">
        <div className="flex w-full items-center justify-between">
          <TechIcon
            src={logoPath || ""}
            fallbackIcon={fallbackIcon}
            alt={label}
            className={logoClassName}
          />
          {selected && <span className="bg-accent h-1.5 w-1.5 rounded-full" />}
        </div>
        <div>
          <p className="font-mono text-sm font-bold">{label}</p>
          {description && (
            <p
              className={cn(
                !selected && "text-muted-foreground",
                "mt-1 text-xs leading-relaxed font-semibold",
              )}
            >
              {description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
