"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TechIcon } from "@/components/tech-icon";
import { Icon } from "@phosphor-icons/react";
import React from "react";

export function OptionCard({
  label,
  description,
  selected,
  onClickAction,
  logoPath,
  fallbackIcon,
  layout = "vertical",
  className,
  logoClassName,
}: {
  label: string;
  description?: string;
  selected: boolean;
  onClickAction: () => void;
  logoPath?: string;
  fallbackIcon?: Icon;
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
      onClickAction();
    }
  };

  if (layout === "horizontal") {
    return (
      <Card
        onClick={onClickAction}
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
      onClick={onClickAction}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={cn(interactiveStyles, className, "")}
    >
      <CardHeader className="flex h-7 w-full items-center justify-between">
        <TechIcon
          src={logoPath || ""}
          fallbackIcon={fallbackIcon}
          alt={label}
          className={logoClassName}
        />
        {selected && <span className="bg-accent h-1.5 w-1.5 rounded-full" />}
      </CardHeader>
      <CardContent className="space-y-3">
        {/*<div className="flex w-full items-center justify-between"></div>*/}
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
