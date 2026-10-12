# Portfolio Website

[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/) [![CodeFactor](https://www.codefactor.io/repository/github/navn-r/navn-r.github.io/badge/main)](https://www.codefactor.io/repository/github/navn-r/navn-r.github.io/overview/main) [![Build & Deploy](https://github.com/navn-r/navn-r.github.io/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/navn-r/navn-r.github.io/actions/workflows/main.yml) [![time tracker](https://wakatime.com/badge/github/navn-r/navn-r.github.io.svg)](https://wakatime.com/badge/github/navn-r/navn-r.github.io)

~~Built with pure HTML and CSS.~~

~~**v1.1:** **v2.0:** Built with Web Components (HTML, CSS, JS) using `lit-element, lit-html` with `polymer-cli`~~

~~**v3.0:** Built with Svelte, TypeScript, Sass, Vite~~

**v4.0:**

- Agents
- **Built With:** React, React Compiler, TypeScript, Vite, Bun

Made with ❤️ by Navinn Ravindaran

---

## Getting Started

Requires Bun and Node.js 22.12 or newer.

Install Dependencies

```sh
bun install
```

Development Server

```sh
bun dev  # http://localhost:5173
```

Build

```sh
bun run build  # TypeScript checks + build to /dist

bun run preview  # serves /dist @ http://localhost:4173
```

## Formatting

Run `bun run format` after editing or generating files.
`bun run format:check` verifies the repository without rewriting it and runs in CI.

## Shader development

[Shaders.com](https://shaders.com) effects are available through `shaders/react`.
The [$shaders](.agents/skills/shaders/SKILL.md) skill covers finding components,
composition, fonts, and images.
