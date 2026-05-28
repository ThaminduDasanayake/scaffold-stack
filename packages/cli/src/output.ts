import type { StackChoices } from "@scaffold-stack/config-schema"
import { PM_COMMANDS } from "@scaffold-stack/config-schema"

export function printNextSteps(choices: StackChoices) {
    const { run } = PM_COMMANDS[choices.packageManager]

    console.log(`
  ✓ Your project is ready!

  Next steps:

    cd ${choices.projectName}
    ${run} dev

  Open http://localhost:3000 to see it running.
  `)
}