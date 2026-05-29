import type { StackChoices, PackageManager, Framework, Language, DBOrm } from "@scaffold-stack/config-schema"

function getFlag(args: string[], flag: string): string | undefined {
    const match = args.find((a) => a.startsWith(`--${flag}=`))
    return match ? match.split("=")[1] : undefined
}

function hasFlag(args: string[], flag: string): boolean {
    return args.includes(`--${flag}`)
}

export function parseFlags(args: string[]): StackChoices {
    const projectName = args[0]

    if (!projectName || projectName.startsWith("--")) {
        console.error("  Error: Please provide a project name.")
        console.error("  Example: pnpm dlx create-scaffold-stack@latest my-app")
        process.exit(1)
    }

    const pm = (getFlag(args, "pm") ?? "pnpm") as PackageManager
    const validPMs: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]
    if (!validPMs.includes(pm)) {
        console.error(`  Error: Invalid package manager "${pm}". Choose from: pnpm, npm, yarn, bun`)
        process.exit(1)
    }

    const framework = (getFlag(args, "framework") ?? "nextjs") as Framework
    const validFrameworks: Framework[] = ["nextjs", "vite"]
    if (!validFrameworks.includes(framework)) {
        console.error(`  Error: Invalid framework "${framework}". Choose from: nextjs, vite`)
        process.exit(1)
    }

    const language = (getFlag(args, "lang") ?? "typescript") as Language
    const validLanguages: Language[] = ["typescript", "javascript"]
    if (!validLanguages.includes(language)) {
        console.error(`  Error: Invalid language "${language}". Choose from: typescript, javascript`)
        process.exit(1)
    }

    const db = (getFlag(args, "db") ?? "none") as DBOrm
    const validDBs: DBOrm[] = ["none", "prisma-postgres", "mongoose", "drizzle"]
    if (!validDBs.includes(db)) {
        console.error(`  Error: Invalid database ORM "${db}". Choose from: none, prisma-postgres, mongoose, drizzle`)
        process.exit(1)
    }

    return {
        projectName,
        packageManager: pm,
        framework,
        language,
        tailwind: hasFlag(args, "tailwind"),
        shadcn: hasFlag(args, "shadcn"),
        eslint: hasFlag(args, "eslint"),
        prettier: hasFlag(args, "prettier"),
        db,
    }
}