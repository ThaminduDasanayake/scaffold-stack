"use client";

import { useState } from "react";
import Link from "next/link";
import { generateCommand } from "@/lib/generate-command";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { CheckIcon, CircleNotchIcon, CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Config {
  id: string;
  name: string;
  description: string;
  choices: any;
  isDefault: boolean;
  updatedAt: string;
}

export function CollectionList({ initialConfigs }: { initialConfigs: Config[] }) {
  const [configs, setConfigs] = useState<Config[]>(initialConfigs);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleCopy(id: string, choices: any) {
    const cmd = generateCommand(choices);
    await navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/configs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setConfigs((prev) => prev.filter((c) => c.id !== id));
        toast.success("Preset deleted successfully.");
      } else {
        toast.error("Failed to delete configuration.");
      }
    } catch {
      toast.error("An error occurred. Failed to delete configuration.");
    } finally {
      setDeletingId(null);
    }
  }

  // Helper to get selected badges for visual stack summary
  function getStackBadges(choices: any) {
    const badges: string[] = [];
    if (choices.packageManager) badges.push(choices.packageManager);
    if (choices.framework) badges.push(choices.framework);
    if (choices.language) badges.push(choices.language);
    if (choices.tailwind) badges.push("Tailwind");
    if (choices.shadcn) badges.push("shadcn/ui");
    if (choices.eslint) badges.push("ESLint");
    if (choices.prettier) badges.push("Prettier");
    if (choices.db && choices.db !== "none") badges.push(`DB: ${choices.db}`);
    return badges;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {configs.map((config) => {
        const badges = getStackBadges(config.choices);
        const isCopied = copiedId === config.id;
        const isDeleting = deletingId === config.id;

        return (
          <Card
            key={config.id}
            className="hover:bg-card/70 ring-border hover:ring-accent group relative flex flex-col justify-between overflow-hidden shadow-xl ring-2 transition-all duration-200"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="truncate text-lg font-bold">{config.name}</CardTitle>
                  <p className="text-muted-foreground mt-1 font-mono text-xs">
                    UPDATED: {new Date(config.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                {config.isDefault && (
                  <span className="bg-primary/20 border-primary/30 text-primary rounded border px-2 py-0.5 font-mono text-[9px] font-bold">
                    DEFAULT
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent>
              {/* Description */}
              {config.description && (
                <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                  {config.description}
                </p>
              )}

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="secondary"
                    className="border-primary border font-mono font-semibold"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="gap-2">
              <Link href={`/configure?preset=${config.id}`} className="flex-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-accent w-full border font-mono text-xs uppercase"
                >
                  Workspace <ArrowRightIcon weight="bold" />
                </Button>
              </Link>

              <Button
                onClick={() => handleCopy(config.id, config.choices)}
                variant="outline"
                size="icon-sm"
              >
                {isCopied ? (
                  <CheckIcon weight="bold" className="text-emerald-500" />
                ) : (
                  <CopyIcon weight="duotone" />
                )}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button disabled={isDeleting} variant="destructive" size="icon-sm">
                    {isDeleting ? (
                      <CircleNotchIcon className="animate-spin" />
                    ) : (
                      <TrashIcon weight="duotone" />
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete preset?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete the preset &quot;{config.name}&quot; and remove
                      it from your collection.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => handleDelete(config.id)}

                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
