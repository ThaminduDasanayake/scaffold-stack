import { execSync } from "child_process"
import type { PackageManager } from "@stackforge/config-schema"
import { PM_COMMANDS } from "@stackforge/config-schema"

export function installDependencies(dir: string, pm: PackageManager) {
    const { install } = PM_COMMANDS[pm]
    console.log(`\n  Installing dependencies with ${pm}...\n`)

    try {
        execSync(install, { cwd: dir, stdio: "inherit" })
    } catch {
        // pnpm may fail if packages need build script approval
        // approve them automatically and retry
        if (pm === "pnpm") {
            try {
                execSync("pnpm approve-builds --yes", { cwd: dir, stdio: "inherit" })
                execSync(install, { cwd: dir, stdio: "inherit" })
            } catch {
                // silent — some environments don't have sharp/unrs-resolver
            }
        }
    }
}

export function initGit(dir: string) {
    try {
        execSync("git -C . init -b main", { cwd: dir, stdio: "pipe" })
        execSync("git -C . add -A", { cwd: dir, stdio: "pipe" })
        execSync('git -C . commit -m "chore: initial commit from StackForge"', {
            cwd: dir,
            stdio: "pipe",
        })
        console.log("  ✓ Git initialized\n")
    } catch (err) {
        console.log("  ⚠ Git init skipped\n")
    }
}