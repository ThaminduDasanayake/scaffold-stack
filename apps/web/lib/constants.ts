import { ProhibitIcon, Icon } from "@phosphor-icons/react";
import type { DBOrm, Framework, Language, PackageManager } from "@scaffold-stack/config-schema";

export interface PMOption {
  value: PackageManager;
  label: string;
  cmd: string;
  logoClassName?: string;
}

export interface FrameworkOption {
  value: Framework;
  label: string;
  description: string;
  logoClassName?: string;
}

export interface LanguageOption {
  value: Language;
  label: string;
  description: string;
  logoClassName?: string;
}

export interface DBOption {
  value: DBOrm;
  label: string;
  description: string;
  logoPath?: string;
  fallbackIcon?: Icon;
  logoClassName?: string;
}

export const PACKAGE_MANAGERS: PMOption[] = [
  { value: "pnpm", label: "pnpm", cmd: "pnpm dlx", logoClassName: "size-10" },
  { value: "npm", label: "npm", cmd: "npx", logoClassName: "size-12" },
  { value: "yarn", label: "yarn", cmd: "yarn dlx", logoClassName: "size-9" },
  { value: "bun", label: "bun", cmd: "bunx", logoClassName: "size-9" },
];

export const FRAMEWORKS: FrameworkOption[] = [
  {
    value: "nextjs",
    label: "Next.js",
    description: "React Framework for the Web with Server Components",
    logoClassName: "size-8",
  },
  {
    value: "vite",
    label: "Vite",
    description: "Lightweight and fast single-page app skeleton",
    logoClassName: "size-8",
  },
];

export const LANGUAGES: LanguageOption[] = [
  {
    value: "typescript",
    label: "TypeScript",
    description: "Strict type-checking and modern developer tooling",
    logoClassName: "size-8",
  },
  {
    value: "javascript",
    label: "JavaScript",
    description: "Standard modern ECMAScript without a compiler layer",
    logoClassName: "size-8",
  },
];

export const DATABASE_ORMS: DBOption[] = [
  {
    value: "none",
    label: "None",
    description: "No pre-configured database layer",
    fallbackIcon: ProhibitIcon,
  },
  {
    value: "prisma-postgres",
    label: "Prisma",
    description: "Type-safe relational ORM for SQL databases",
    logoPath: "/logos/prisma.svg",
    logoClassName: "size-8",
  },
  {
    value: "mongoose",
    label: "Mongoose",
    description: "Robust object modeling helper for MongoDB",
    logoPath: "/logos/mongoose.svg",
    logoClassName: "size-12",
  },
  {
    value: "drizzle",
    label: "Drizzle",
    description: "Fast, fully type-safe light relational SQL ORM",
    logoPath: "/logos/drizzle.webp",
    logoClassName: "size-10",
  },
];
