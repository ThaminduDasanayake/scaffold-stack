#!/usr/bin/env node

import { parseFlags } from "./flags.js"
import { scaffold } from "./scaffold.js"

const choices = parseFlags(process.argv.slice(2))
await scaffold(choices)