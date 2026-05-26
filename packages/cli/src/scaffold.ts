import { mkdir, copyFile, writeFile, readdir, unlink } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import type { StackChoices } from "@stackforge/config-schema"
import { PM_COMMANDS } from "@stackforge/config-schema"
import { installDependencies, initGit } from "./install.js"
import { printNextSteps } from "./output.js"

export async function scaffold(choices: StackChoices) {
    const projectDir = path.resolve(process.cwd(), choices.projectName)

    if (existsSync(projectDir)) {
        console.error(`\n  Error: Folder "${choices.projectName}" already exists.\n`)
        process.exit(1)
    }

    console.log(`\n  Creating ${choices.projectName}...\n`)

    // 1. Create project directory
    await mkdir(projectDir, { recursive: true })

    // 2. Write .npmrc FIRST — before install so pnpm reads it
    await writeFile(
        path.join(projectDir, ".npmrc"),
        `approve-builds[]=sharp\napprove-builds[]=unrs-resolver\n`
    )

    // 3. Write package.json
    await writePackageJson(projectDir, choices)

    // 4. Write all other config files
    await writeConfigFiles(projectDir, choices)

    // 5. Install dependencies
    // git remote set-url origin https://github.com/YOUR_GITHUB_USERNAME/NEW_REPO_NAME.git
    installDependencies(projectDir, choices.packageManager)

    // 6. Git init
    initGit(projectDir)

    // 7. Print next steps
    printNextSteps(choices)
}

async function writePackageJson(dir: string, choices: StackChoices) {
    const { run } = PM_COMMANDS[choices.packageManager]

    const packageJson = {
        name: choices.projectName,
        version: "0.1.0",
        private: true,
        scripts: {
            dev:   "next dev --turbopack",
            build: "next build",
            start: "next start",
            lint:  "next lint",
        },
        dependencies: {
            next: "^16.0.0",
            react: "^19.0.0",
            "react-dom": "^19.0.0",
            ...(choices.auth === "nextauth" ? { "next-auth": "beta" } : {}),
            ...(choices.auth === "clerk" ? { "@clerk/nextjs": "latest" } : {}),
            ...(choices.db === "prisma-postgres" || choices.db === "prisma-sqlite"
                ? { "@prisma/client": "latest" }
                : {}),
            ...(choices.db === "mongoose" ? { mongoose: "latest" } : {}),
            ...(choices.ui === "shadcn" ? { "class-variance-authority": "latest", clsx: "latest", "tailwind-merge": "latest" } : {}),
        },
        devDependencies: {
            typescript: "^5.0.0",
            "@types/node": "^20.0.0",
            "@types/react": "^19.0.0",
            "@types/react-dom": "^19.0.0",
            tailwindcss: "^4.0.0",
            "@tailwindcss/postcss": "^4.0.0",
            ...(choices.eslint !== "none" ? { eslint: "^9.0.0", "eslint-config-next": "latest" } : {}),
            ...(choices.prettier ? { prettier: "^3.0.0" } : {}),
            ...(choices.testing === "vitest" ? { vitest: "latest", "@vitejs/plugin-react": "latest" } : {}),
            ...(choices.testing === "jest" ? { jest: "latest", "@types/jest": "latest" } : {}),
            ...(choices.db === "prisma-postgres" || choices.db === "prisma-sqlite"
                ? { prisma: "latest" }
                : {}),
        },
    }

    await writeFile(
        path.join(dir, "package.json"),
        JSON.stringify(packageJson, null, 2)
    )
}

async function writeConfigFiles(dir: string, choices: StackChoices) {
    // tsconfig.json
    const tsconfig = {
        compilerOptions: {
            target: "ES2017",
            lib: ["dom", "dom.iterable", "esnext"],
            allowJs: true,
            skipLibCheck: true,
            strict: choices.tsStrict,
            noEmit: true,
            esModuleInterop: true,
            module: "esnext",
            moduleResolution: "bundler",
            resolveJsonModule: true,
            isolatedModules: true,
            jsx: "preserve",
            incremental: true,
            plugins: [{ name: "next" }],
            paths: { "@/*": ["./*"] },
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"],
    }

    await writeFile(
        path.join(dir, "tsconfig.json"),
        JSON.stringify(tsconfig, null, 2)
    )

    // next.config.ts
    await writeFile(
        path.join(dir, "next.config.ts"),
        `import type { NextConfig } from "next"\n\nconst nextConfig: NextConfig = {}\n\nexport default nextConfig\n`
    )

    // postcss.config.mjs (Tailwind v4)
    await writeFile(
        path.join(dir, "postcss.config.mjs"),
        `const config = {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n}\n\nexport default config\n`
    )

    // ESLint config
    if (choices.eslint === "strict") {
        await writeFile(
            path.join(dir, "eslint.config.mjs"),
            `import js from "@eslint/js"\nimport tseslint from "typescript-eslint"\n\nexport default tseslint.config(\n  js.configs.recommended,\n  ...tseslint.configs.strictTypeChecked,\n  {\n    rules: {\n      "@typescript-eslint/no-explicit-any": "error",\n      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],\n      "no-console": "warn",\n    },\n  }\n)\n`
        )
    } else if (choices.eslint === "relaxed") {
        await writeFile(
            path.join(dir, "eslint.config.mjs"),
            `import js from "@eslint/js"\nimport tseslint from "typescript-eslint"\n\nexport default tseslint.config(\n  js.configs.recommended,\n  ...tseslint.configs.recommended,\n  {\n    rules: {\n      "@typescript-eslint/no-explicit-any": "warn",\n      "@typescript-eslint/no-unused-vars": "warn",\n    },\n  }\n)\n`
        )
    }

    // Prettier config
    if (choices.prettier) {
        await writeFile(
            path.join(dir, ".prettierrc.json"),
            JSON.stringify(
                {
                    semi: true,
                    singleQuote: false,
                    tabWidth: 2,
                    trailingComma: "es5",
                    printWidth: 80,
                },
                null,
                2
            )
        )
    }

    // .npmrc — pre-approve known safe build scripts
    await writeFile(
        path.join(dir, ".npmrc"),
        `# Pre-approved build scripts\napprove-builds[]=sharp\napprove-builds[]=unrs-resolver\n`
    )

    // Create basic app structure
    await mkdir(path.join(dir, "app"), { recursive: true })
    await mkdir(path.join(dir, "public"), { recursive: true })

    // globals.css
    await writeFile(
        path.join(dir, "app/globals.css"),
        `@import "tailwindcss";\n`
    )

    // layout.tsx
    await writeFile(
        path.join(dir, "app/layout.tsx"),
        `import type { Metadata } from "next"\nimport "./globals.css" 
import React from "react";\n\nexport const metadata: Metadata = {\n  title: "${choices.projectName}",\n  description: "Generated by StackForge",\n}\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  )\n}\n`
    )

    // page.tsx
    await writeFile(
        path.join(dir, "app/page.tsx"),
        `export default function Home() {\n  return (\n    <main className="flex min-h-screen items-center justify-center">\n      <h1 className="text-4xl font-bold">Welcome to ${choices.projectName}</h1>\n    </main>\n  )\n}\n`
    )

    // Ensure no workspace files bleed into the generated project
    const unwantedFiles = ["pnpm-workspace.yaml", ".npmrc"]
    for (const file of unwantedFiles) {
        const filePath = path.join(dir, file)
        if (existsSync(filePath)) {
            await unlink(filePath)
        }
    }
}