"use client";

import { useState } from "react";
import { DEFAULT_CHOICES, generateCommand } from "@/lib/generate-command";
import type { StackChoices } from "@scaffold-stack/config-schema";

import { SectionStack } from "./section-stack";
import { SectionQuality } from "./section-quality";
import { SectionExtras } from "./section-extras";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckIcon, CopyIcon } from "@phosphor-icons/react";

interface ConfiguratorProps {
  isSignedIn: boolean;
  initialChoices?: Partial<StackChoices>;
}

export function Configurator({ isSignedIn, initialChoices }: ConfiguratorProps) {
  const [choices, setChoices] = useState<StackChoices>({
    ...DEFAULT_CHOICES,
    ...initialChoices,
  });

  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [configName, setConfigName] = useState("");

  // Instantly generates the string every time a render occurs
  const liveCommand = generateCommand(choices);

  function update(partial: Partial<StackChoices>) {
    setChoices((prev) => ({ ...prev, ...partial }));
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(liveCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSave() {
    if (!configName.trim()) return;
    setSaving(true);
    try {
      await fetch("/api/configs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: configName, choices }),
      });
      alert("Config saved to your dashboard!");
      setConfigName("");
    } catch {
      alert("Failed to save configuration.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="relative flex flex-col gap-12 lg:flex-row">
      {/* Left Column: The Configuration Options (Scrollable) */}
      <div className="flex-1 space-y-16 pb-20">
        <section>
          <div className="border-border mb-6 border-b pb-4">
            <h2 className="text-foreground text-xl font-bold">Core Stack</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Choose your runtime, package manager, and framework preferences.
            </p>
          </div>
          <SectionStack choices={choices} update={update} />
        </section>

        <section>
          <div className="border-border mb-6 border-b pb-4">
            <h2 className="text-foreground text-xl font-bold">Code Quality</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Configure ESLint and Prettier formatting standard rules.
            </p>
          </div>
          <SectionQuality choices={choices} update={update} />
        </section>

        <section>
          <div className="border-border mb-6 border-b pb-4">
            <h2 className="text-foreground text-xl font-bold">Database Layer</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Drop in your preferred ORM and database layer connection configuration.
            </p>
          </div>
          <SectionExtras choices={choices} update={update} />
        </section>
      </div>

      {/* Right Column: Persistent Live Command & Save State (Sticky) */}
      <div className="w-full lg:w-100">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle className="font-bold tracking-wider uppercase">Initialize Project</CardTitle>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="group relative">
              <div className="bg-background flex min-h-20 items-center rounded-lg p-4 pr-24">
                <pre className="text-primary font-mono text-sm leading-relaxed font-semibold break-all whitespace-pre-wrap">
                  {liveCommand}
                </pre>
              </div>
              <Button
                onClick={handleCopy}
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3"
              >
                {copied ? (
                  <CheckIcon weight="bold" className="text-emerald-500" />
                ) : (
                  <CopyIcon weight="duotone" />
                )}
              </Button>
            </div>

            {isSignedIn ? (
              <div className="flex w-full flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="font-mono text-xs">Save preset for later</Label>
                  <Input
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                    placeholder="e.g. Acme Corp SaaS"
                    className="h-9 font-mono"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  disabled={saving || !configName.trim()}
                  className="min-w-xs font-mono font-bold"
                >
                  {saving ? "Saving..." : "Save preset"}
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                <Link
                  href="/signin"
                  className="hover:text-primary text-foreground underline underline-offset-4 transition-colors"
                >
                  Sign in
                </Link>{" "}
                to save this stack preset to your dashboard.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
