import {
  AtomIcon,
  BrowserIcon,
  CpuIcon,
  FileJsIcon,
  FileTsIcon,
  GearIcon,
  LightningIcon,
  ProhibitIcon,
} from "@phosphor-icons/react";
import type { DBOrm, Framework, Language, PackageManager } from "@scaffold-stack/config-schema";

export interface PMOption {
  value: PackageManager;
  label: string;
  cmd: string;
  icon: any;
}

export interface FrameworkOption {
  value: Framework;
  label: string;
  description: string;
  icon: any;
}

export interface LanguageOption {
  value: Language;
  label: string;
  description: string;
  icon: any;
}

export interface DBOption {
  value: DBOrm;
  label: string;
  description: string;
  logoPath?: string;
  fallbackIcon?: any;
}

export const PACKAGE_MANAGERS: PMOption[] = [
  { value: "pnpm", label: "pnpm", cmd: "pnpm dlx", icon: CpuIcon },
  { value: "npm", label: "npm", cmd: "npx", icon: GearIcon },
  { value: "yarn", label: "yarn", cmd: "yarn dlx", icon: AtomIcon },
  { value: "bun", label: "bun", cmd: "bunx", icon: LightningIcon },
];

export const FRAMEWORKS: FrameworkOption[] = [
  {
    value: "nextjs",
    label: "Next.js",
    description: "React Framework for the Web with Server Components",
    icon: BrowserIcon,
  },
  {
    value: "vite",
    label: "Vite",
    description: "Lightweight and fast single-page app skeleton",
    icon: LightningIcon,
  },
];

export const LANGUAGES: LanguageOption[] = [
  {
    value: "typescript",
    label: "TypeScript",
    description: "Strict type-checking and modern developer tooling",
    icon: FileTsIcon,
  },
  {
    value: "javascript",
    label: "JavaScript",
    description: "Standard modern ECMAScript without a compiler layer",
    icon: FileJsIcon,
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
  },
  {
    value: "mongoose",
    label: "Mongoose",
    description: "Robust object modeling helper for MongoDB",
    logoPath: "/logos/mongoose.svg",
  },
  {
    value: "drizzle",
    label: "Drizzle",
    description: "Fast, fully type-safe light relational SQL ORM",
    logoPath: "/logos/drizzle.webp",
  },
];
