'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { StackIcon } from '@phosphor-icons/react'

export function Navbar() {
  const pathname = usePathname()
  const { data: session, isPending } = authClient.useSession()

  async function handleSignOut() {
    await authClient.signOut()
    window.location.reload()
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/configure', label: 'Configure' },
    { href: '/dashboard', label: 'Dashboard', protected: true },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {/*<span className="w-3.5 h-3.5 rounded-sm bg-primary shadow-[0_0_12px_rgba(var(--primary),0.6)] group-hover:scale-110 transition-transform" />*/}
          <StackIcon weight="duotone" className="text-primary size-5" />
          <span className="font-mono font-bold tracking-tight text-lg bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            scaffold-stack
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            // Skip protected links if user is not signed in
            if (link.protected && !session) return null

            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-mono font-bold uppercase tracking-wider transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <ThemeToggle />

        {/* Auth Actions */}
        <div className="flex items-center gap-4">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-4">
              {/* User Profile */}
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs font-bold text-foreground">{session.user.name}</span>
              </div>

              {/* User Avatar */}
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-8 h-8 rounded-full border border-border shadow-md"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-mono font-bold text-xs text-primary shadow-inner">
                  {session.user.name.slice(0, 2).toUpperCase()}
                </div>
              )}

              {/* Sign Out Button */}
              <Button onClick={handleSignOut} variant="destructive">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/configure">
                <Button variant="default">Build Stack</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
