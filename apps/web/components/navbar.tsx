"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { StackIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    window.location.reload();
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/configure", label: "Configure" },
    { href: "/collection", label: "Collection", protected: true },
  ];

  return (
    <header className="border-border/40 bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-10">
          <Link href="/" className="group flex items-center gap-2">
            <StackIcon weight="duotone" className="text-primary size-5" />
            <span className="gradient-text font-mono text-lg font-bold">scaffold-stack</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              if (link.protected && !session) return null;

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "hover:text-primary relative py-1 font-mono text-xs font-bold tracking-wider uppercase transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="bg-primary animate-in fade-in absolute right-0 bottom-0 left-0 h-0.5 rounded-full duration-300" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Auth Actions */}
          <div className="bg-border/60 hidden h-6 w-px sm:block" />

          {isPending ? (
            <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />
          ) : session ? (
            <div className="flex items-center gap-4">
              {/* User Profile */}
              <div className="hidden flex-col items-end text-right sm:flex">
                <span className="text-foreground text-xs font-bold">{session.user.name}</span>
              </div>

              {/* User Avatar */}
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="border-border h-8 w-8 rounded-full border shadow-md"
                />
              ) : (
                <div className="bg-primary/10 border-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-full border font-mono text-xs font-bold shadow-inner">
                  {session.user.name.slice(0, 2).toUpperCase()}
                </div>
              )}

              {/* Sign Out Button */}
              <Button onClick={handleSignOut} variant="destructive" className="font-mono font-bold">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button variant="outline" className="border-accent font-mono text-xs font-bold">
                  Sign In
                </Button>
              </Link>
              <Link href="/configure">
                <Button variant="default" className="font-mono text-xs font-bold">
                  Build Stack
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
