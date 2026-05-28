import { 
    Cpu, 
    Gear, 
    Atom, 
    Lightning, 
    Prohibit, 
    Database, 
    Leaf, 
    Drop,
    FileTs,
    FileJs,
    Browser
} from "@phosphor-icons/react"
import type { PackageManager, Framework, Language, DBOrm } from "@scaffold-stack/config-schema"

export interface PMOption {
    value: PackageManager
    label: string
    cmd: string
    icon: any
}

export interface FrameworkOption {
    value: Framework
    label: string
    description: string
    icon: any
}

export interface LanguageOption {
    value: Language
    label: string
    description: string
    icon: any
}

export interface DBOption {
    value: DBOrm
    label: string
    description: string
    logoPath: string
    fallbackIcon: any
}

export const PACKAGE_MANAGERS: PMOption[] = [
    { value: "pnpm", label: "pnpm", cmd: "pnpm dlx", icon: Cpu },
    { value: "npm",  label: "npm",  cmd: "npx",      icon: Gear },
    { value: "yarn", label: "yarn", cmd: "yarn dlx", icon: Atom },
    { value: "bun",  label: "bun",  cmd: "bunx",     icon: Lightning },
]

export const FRAMEWORKS: FrameworkOption[] = [
    { value: "nextjs", label: "Next.js", description: "React Framework for the Web with Server Components", icon: Browser },
    { value: "vite-react", label: "Vite + React", description: "Lightweight and fast single-page app skeleton", icon: Lightning },
]

export const LANGUAGES: LanguageOption[] = [
    { value: "typescript", label: "TypeScript", description: "Strict type-checking and modern developer tooling", icon: FileTs },
    { value: "javascript", label: "JavaScript", description: "Standard modern ECMAScript without a compiler layer", icon: FileJs },
]

export const DATABASE_ORMS: DBOption[] = [
    { 
        value: "none", 
        label: "None", 
        description: "No pre-configured database layer", 
        logoPath: "/logos/none.svg", 
        fallbackIcon: Prohibit 
    },
    { 
        value: "prisma-postgres", 
        label: "Prisma", 
        description: "Type-safe relational ORM for SQL databases", 
        logoPath: "/logos/prisma.svg", 
        fallbackIcon: Database 
    },
    { 
        value: "mongoose", 
        label: "Mongoose", 
        description: "Robust object modeling helper for MongoDB", 
        logoPath: "/logos/mongoose.svg", 
        fallbackIcon: Leaf 
    },
    { 
        value: "drizzle", 
        label: "Drizzle", 
        description: "Fast, fully type-safe light relational SQL ORM", 
        logoPath: "/logos/drizzle.svg", 
        fallbackIcon: Drop 
    },
]
