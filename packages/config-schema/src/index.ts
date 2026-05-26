export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export interface StackChoices {
    projectName: string
    packageManager: PackageManager

    tailwind: boolean
    tailwindVersion: "v3" | "v4"

    typescript: boolean
    tsStrict: boolean

    eslint: "none" | "relaxed" | "strict" | "custom"
    eslintRules?: Record<string, unknown>

    prettier: boolean
    prettierConfig?: {
        semi: boolean
        singleQuote: boolean
        tabWidth: 2 | 4
        trailingComma: "none" | "es5" | "all"
        printWidth: number
    }

    srcDir: boolean
    structure: "feature" | "type"

    auth: "none" | "nextauth" | "clerk"
    db: "none" | "prisma-postgres" | "prisma-sqlite" | "drizzle" | "mongoose"
    ui: "none" | "shadcn" | "radix"
    testing: "none" | "vitest" | "jest"
    storybook: boolean
    husky: boolean
    commitlint: boolean
    dockerCompose: boolean
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