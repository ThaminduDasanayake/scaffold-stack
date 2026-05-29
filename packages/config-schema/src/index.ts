export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
export type Framework = "nextjs" | "vite"
export type Language = "typescript" | "javascript"
export type DBOrm = "none" | "prisma-postgres" | "mongoose" | "drizzle"

export interface StackChoices {
    projectName: string
    packageManager: PackageManager
    framework: Framework
    language: Language
    tailwind: boolean
    shadcn: boolean
    eslint: boolean
    prettier: boolean
    db: DBOrm
}

export const PM_COMMANDS: Record<PackageManager, {
    dlx: string
    install: string
    run: string
    add: string
}> = {
    pnpm: { dlx: "pnpm dlx", install: "pnpm install", run: "pnpm",    add: "pnpm add" },
    npm:  { dlx: "npx",      install: "npm install",  run: "npm run", add: "npm install" },
    yarn: { dlx: "yarn dlx", install: "yarn",         run: "yarn",    add: "yarn add" },
    bun:  { dlx: "bunx",     install: "bun install",  run: "bun run", add: "bun add" },
}