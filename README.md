# Portfolio Website

[![Build & Deploy](https://github.com/navn-r/navn-r.github.io/actions/workflows/main.yml/badge.svg?branch=develop)](https://github.com/navn-r/navn-r.github.io/actions/workflows/main.yml)  [![time tracker](https://wakatime.com/badge/github/navn-r/navn-r.github.io.svg)](https://wakatime.com/badge/github/navn-r/navn-r.github.io)

~~Built with pure HTML and CSS.~~  

~~**v1.1:** **v2.0:** Built with Web Components (HTML, CSS, JS) using `lit-element, lit-html` with `polymer-cli`~~
  - ~~Automated deployment to `master` branch with Travis CI~~


**v3.0: Under Construction**
  - Pre-commit linting ([eslint](https://eslint.org/)) + formatting ([prettier](https://prettier.io/)) with [Husky](https://typicode.github.io/husky)
  - Commit messages enforced with [Conventional Commits](https://www.conventionalcommits.org/)
  - Automated build and deployment with Github Actions and Github Pages
  - **Built With:** Svelte, TypeScript, Sass, Vite

Made with ❤️ by Navinn Ravindaran

---

## Getting Started

Install Dependencies
```sh
yarn  # runs husky install after completion
```

Development Server
```sh
yarn run dev  # http://localhost:3000
```

Build
```sh
yarn run build  # /dist

yarn run serve  # serves /dist @ http://localhost:5000
```

Lint
```sh
yarn run lint  # lints /src
```
<!-- TODO: add '.scss' -->
Format
```sh
yarn run format  # formats .svelte, .ts @ /src
```
