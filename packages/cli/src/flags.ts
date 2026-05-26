import type { StackChoices, PackageManager } from "@stackforge/config-schema"

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
        console.error("  Example: pnpm dlx create-stackforge@latest my-app")
        process.exit(1)
    }

    const pm = (getFlag(args, "pm") ?? "pnpm") as PackageManager
    const validPMs: PackageManager[] = ["pnpm", "npm", "yarn", "bun"]
    if (!validPMs.includes(pm)) {
        console.error(`  Error: Invalid package manager "${pm}". Choose from: pnpm, npm, yarn, bun`)
        process.exit(1)
    }

    return {
        projectName,
        packageManager: pm,

        tailwind: true,
        tailwindVersion: (getFlag(args, "tw") ?? "v4") as "v3" | "v4",

        typescript: true,
        tsStrict: hasFlag(args, "ts-strict"),

        eslint: (getFlag(args, "eslint") ?? "relaxed") as StackChoices["eslint"],
        prettier: hasFlag(args, "prettier"),

        srcDir: hasFlag(args, "src-dir"),
        structure: (getFlag(args, "structure") ?? "type") as "feature" | "type",

        auth: (getFlag(args, "auth") ?? "none") as StackChoices["auth"],
        db: (getFlag(args, "db") ?? "none") as StackChoices["db"],
        ui: (getFlag(args, "ui") ?? "none") as StackChoices["ui"],
        testing: (getFlag(args, "testing") ?? "none") as StackChoices["testing"],

        storybook: hasFlag(args, "storybook"),
        husky: hasFlag(args, "husky"),
        commitlint: hasFlag(args, "commitlint"),
        dockerCompose: hasFlag(args, "docker"),
    }
}