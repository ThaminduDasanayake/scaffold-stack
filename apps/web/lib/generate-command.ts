import type { StackChoices } from "@scaffold-stack/config-schema"
import { PM_COMMANDS } from "@scaffold-stack/config-schema"

export function generateCommand(choices: StackChoices): string {
    const pm = PM_COMMANDS[choices.packageManager]
    const flags: string[] = []

    flags.push(`--pm=${choices.packageManager}`)
    flags.push(`--framework=${choices.framework}`)
    flags.push(`--lang=${choices.language}`)
    
    if (choices.tailwind) flags.push("--tailwind")
    if (choices.shadcn)   flags.push("--shadcn")
    if (choices.eslint)   flags.push("--eslint")
    if (choices.prettier) flags.push("--prettier")
    if (choices.db !== "none") flags.push(`--db=${choices.db}`)

    return `${pm.dlx} create-scaffold-stack@latest my-app ${flags.join(" ")}`
}

export function generateNextSteps(choices: StackChoices): string[] {
    const { run } = PM_COMMANDS[choices.packageManager]
    return [`cd my-app`, `${run} dev`]
}

export const DEFAULT_CHOICES: StackChoices = {
    projectName: "my-app",
    packageManager: "pnpm",
    framework: "nextjs",
    language: "typescript",
    tailwind: true,
    shadcn: true,
    eslint: true,
    prettier: true,
    db: "none",
}