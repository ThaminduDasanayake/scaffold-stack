import {mkdir, unlink, writeFile} from "fs/promises";
import {existsSync} from "fs";
import path from "path";
import type {StackChoices} from "@scaffold-stack/config-schema";
import {PM_COMMANDS} from "@scaffold-stack/config-schema";
import {initGit, installDependencies} from "./install.js";
import {printNextSteps} from "./output.js";

export async function scaffold(choices: StackChoices) {
    const projectDir = path.resolve(process.cwd(), choices.projectName);

    if (existsSync(projectDir)) {
        console.error(`\n  Error: Folder "${choices.projectName}" already exists.\n`);
        process.exit(1);
    }

    console.log(`\n  Creating ${choices.projectName}...\n`);

    // 1. Create project directory
    await mkdir(projectDir, {recursive: true});

    // 2. Write package.json
    await writePackageJson(projectDir, choices);

    // 3. Write all other config files
    await writeConfigFiles(projectDir, choices);

    // 4. Install dependencies
    installDependencies(projectDir, choices.packageManager);

    // 5. Git init
    initGit(projectDir);

    // 6. Print next steps
    printNextSteps(choices);
}

async function writePackageJson(dir: string, choices: StackChoices) {
    const isTS = choices.language === "typescript";
    const isNext = choices.framework === "nextjs";

    const packageJson = {
      name: choices.projectName,
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        dev: isNext ? "next dev" : "vite",
        build: isNext ? "next build" : (isTS ? "tsc && vite build" : "vite build"),
        preview: isNext ? "next start" : "vite preview",
        ...(choices.eslint ? { lint: "eslint ." } : {}),
      },
      dependencies: {
        react: "^19.0.0",
        "react-dom": "^19.0.0",
        ...(isNext ? { next: "^16.0.0" } : {}),
        ...(choices.db === "prisma-postgres" ? { "@prisma/client": "latest" } : {}),
        ...(choices.db === "mongoose" ? { mongoose: "latest" } : {}),
        ...(choices.shadcn ? {
          "class-variance-authority": "latest",
          clsx: "latest",
          "tailwind-merge": "latest"
        } : {}),
      },
      devDependencies: {
        ...(isTS ? {
          typescript: "^5.0.0",
          "@types/react": "^19.0.0",
          "@types/react-dom": "^19.0.0",
          ...(isNext ? { "@types/node": "^20.0.0" } : {})
        } : {}),
        ...(!isNext ? { "@vitejs/plugin-react": "latest", vite: "latest" } : {}),
        ...(choices.tailwind ? {
          tailwindcss: "^4.0.0",
          "@tailwindcss/postcss": "^4.0.0",
          postcss: "^8.0.0"
        } : {}),
        ...(choices.eslint ? {
          eslint: "^9.0.0",
          ...(isNext ? { "eslint-config-next": "latest" } : {
            "@eslint/js": "latest",
            "typescript-eslint": "latest",
            "eslint-plugin-react-hooks": "latest",
            "eslint-plugin-react-refresh": "latest"
          })
        } : {}),
        ...(choices.prettier ? {
          prettier: "^3.0.0",
          "prettier-plugin-tailwindcss": "latest"
        } : {}),
        ...(choices.db === "prisma-postgres" || choices.db === "drizzle" ? { prisma: "latest" } : {}),
        ...(choices.db === "drizzle" ? { "drizzle-kit": "latest" } : {}),
      },
    };

    await writeFile(
        path.join(dir, "package.json"),
        JSON.stringify(packageJson, null, 2)
    );
}

async function writeConfigFiles(dir: string, choices: StackChoices) {
    const isTS = choices.language === "typescript";
    const ext = isTS ? "ts" : "js";
    const jsxExt = isTS ? "tsx" : "jsx";
    const isNext = choices.framework === "nextjs";

    // 1. tsconfig.json (if TS)
    if (isTS) {
      const tsconfig = isNext ? {
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "preserve",
          incremental: true,
          plugins: [{name: "next"}],
          paths: {"@/*": ["./*"]},
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
        exclude: ["node_modules"],
      } : {
        compilerOptions: {
          target: "ES2020",
          useDefineForClassFields: true,
          lib: ["DOM", "DOM.Iterable", "ES2020"],
          module: "ESNext",
          skipLibCheck: true,
          moduleResolution: "bundler",
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: "react-jsx",
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
          paths: {"@/*": ["./src/*"]},
        },
        include: ["src"],
      };

      await writeFile(
          path.join(dir, "tsconfig.json"),
          JSON.stringify(tsconfig, null, 2)
      );
    }

    // 2. PostCSS config (if Tailwind v4)
    if (choices.tailwind) {
      await writeFile(
          path.join(dir, "postcss.config.mjs"),
          `const config = {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n}\n\nexport default config\n`
      );
    }

    // 3. Prettier config
    if (choices.prettier) {
      await writeFile(
          path.join(dir, "prettier.config.mjs"),
          `/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["clsx", "cn", "twMerge"],
};

export default config;
`
      );
    }

    // 4. ESLint config
    if (choices.eslint) {
      if (isNext) {
        await writeFile(
            path.join(dir, "eslint.config.mjs"),
            `import { defineConfig } from "eslint/config"\nimport nextVitals from "eslint-config-next/core-web-vitals"\n\nexport default defineConfig([\n  ...nextVitals,\n])\n`
        );
      } else {
        await writeFile(
            path.join(dir, "eslint.config.mjs"),
            `import js from "@eslint/js"\nimport tseslint from "typescript-eslint"\n\nexport default tseslint.config(\n  js.configs.recommended,\n  ...tseslint.configs.recommended,\n)\n`
        );
      }
    }

    // 5. Database setup
    if (choices.db === "prisma-postgres") {
      await mkdir(path.join(dir, "prisma"), {recursive: true});
      await writeFile(
          path.join(dir, "prisma/schema.prisma"),
          `generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n`
      );

      await mkdir(path.join(dir, isNext ? "lib" : "src/lib"), {recursive: true});
      await writeFile(
          path.join(dir, isNext ? "lib/db." + ext : "src/lib/db." + ext),
          `import { PrismaClient } from "@prisma/client"\n\nconst globalForPrisma = global as unknown as { prisma: PrismaClient }\n\nexport const prisma =\n  globalForPrisma.prisma ??\n  new PrismaClient()\n\nif (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma\n`
      );
    }

    if (choices.db === "mongoose") {
      await mkdir(path.join(dir, isNext ? "lib" : "src/lib"), {recursive: true});
      await writeFile(
          path.join(dir, isNext ? "lib/mongodb." + ext : "src/lib/mongodb." + ext),
          `import mongoose from "mongoose"\n\nconst MONGODB_URI = process.env.MONGODB_URI!\n\nif (!MONGODB_URI) {\n  throw new Error("MONGODB_URI is not defined")\n}\n\nlet cached = (global as any).mongoose ?? { conn: null, promise: null }\n;(global as any).mongoose = cached\n\nexport async function connectDB() {\n  if (cached.conn) return cached.conn\n  if (!cached.promise) {\n    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })\n  }\n  cached.conn = await cached.promise\n  return cached.conn\n}\n`
      );
    }

    if (choices.db === "drizzle") {
      await mkdir(path.join(dir, isNext ? "lib" : "src/lib"), {recursive: true});
      await writeFile(
          path.join(dir, isNext ? "lib/db." + ext : "src/lib/db." + ext),
          `import { drizzle } from "drizzle-orm/node-postgres"\nimport pg from "pg"\n\nconst pool = new pg.Pool({\n  connectionString: process.env.DATABASE_URL,\n})\n\nexport const db = drizzle(pool)\n`
      );
    }

    // 6. shadcn/ui custom setup
    if (choices.shadcn) {
      await writeFile(
          path.join(dir, "components.json"),
          JSON.stringify({
            "$schema": "https://ui.shadcn.com/schema.json",
            style: "default",
            rsc: isNext,
            tsx: isTS,
            tailwind: {
              config: "",
              css: isNext ? "app/globals.css" : "src/index.css",
              baseColor: "slate",
              cssVariables: true,
            },
            aliases: {
              components: "@/components",
              utils: "@/lib/utils",
            },
          }, null, 2)
      );

      await mkdir(path.join(dir, isNext ? "lib" : "src/lib"), {recursive: true});
      await writeFile(
          path.join(dir, isNext ? "lib/utils." + ext : "src/lib/utils." + ext),
          `import { type ClassValue, clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n`
      );
    }

    // 7. Write Framework structures
    if (isNext) {
      await mkdir(path.join(dir, "app"), {recursive: true});
      await mkdir(path.join(dir, "public"), {recursive: true});

      // layout.tsx / layout.jsx
      await writeFile(
          path.join(dir, "app/layout." + jsxExt),
          `import "./globals.css"\nimport React from "react"\n\nexport const metadata = {\n  title: "${choices.projectName}",\n  description: "Generated by Scaffold Stack",\n}\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  )\n}\n`
      );

      // page.tsx / page.jsx
      await writeFile(
          path.join(dir, "app/page." + jsxExt),
          `import React from "react"\n\nexport default function Home() {\n  return (\n    <main className="flex min-h-screen items-center justify-center">\n      <h1 className="text-4xl font-bold">Welcome to ${choices.projectName}</h1>\n    </main>\n  )\n}\n`
      );

      // globals.css
      await writeFile(
          path.join(dir, "app/globals.css"),
          choices.tailwind ? `@import "tailwindcss";\n` : `/* Style Sheets */\n`
      );

      // next.config.ts / next.config.mjs
      if (isTS) {
        await writeFile(
            path.join(dir, "next.config.ts"),
            `import type { NextConfig } from "next"\n\nconst nextConfig: NextConfig = {}\n\nexport default nextConfig\n`
        );
      } else {
        await writeFile(
            path.join(dir, "next.config.mjs"),
            `/** @type {import('next').NextConfig} */\nconst nextConfig = {}\n\nexport default nextConfig\n`
        );
      }

      if (isTS) {
        await writeFile(
            path.join(dir, "next-env.d.ts"),
            `/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n`
        );
      }
    } else {
      // Vite structure
      await mkdir(path.join(dir, "src"), {recursive: true});
      await mkdir(path.join(dir, "public"), {recursive: true});

      // index.html
      await writeFile(
          path.join(dir, "index.html"),
          `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${choices.projectName}</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.${jsxExt}"></script>\n  </body>\n</html>\n`
      );

      // main.tsx / main.jsx
      await writeFile(
          path.join(dir, "src/main." + jsxExt),
          `import React from "react"\nimport ReactDOM from "react-dom/client"\nimport App from "./App"\nimport "./index.css"\n\nReactDOM.createRoot(document.getElementById("root")!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)\n`
      );

      // App.tsx / App.jsx
      await writeFile(
          path.join(dir, "src/App." + jsxExt),
          `import React from "react"\n\nexport default function App() {\n  return (\n    <div className="flex min-h-screen items-center justify-center">\n      <h1 className="text-4xl font-bold">Welcome to ${choices.projectName} (Vite)</h1>\n    </div>\n  )\n}\n`
      );

      // index.css
      await writeFile(
          path.join(dir, "src/index.css"),
          choices.tailwind ? `@import "tailwindcss";\n` : `/* Style Sheets */\n`
      );

      // vite.config.ts / vite.config.js
      await writeFile(
          path.join(dir, "vite.config." + ext),
          `import { defineConfig } from "vite"\nimport react from "@vitejs/plugin-react"\n\nexport default defineConfig({\n  plugins: [react()],\n})\n`
      );
    }

    // Clean up unnecessary files
    const unwantedFiles = ["pnpm-workspace.yaml", ".npmrc"];
    for (const file of unwantedFiles) {
      const filePath = path.join(dir, file);
      if (existsSync(filePath)) {
        await unlink(filePath);
      }
    }
}