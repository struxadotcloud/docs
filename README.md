<div align="center">

# Struxa Docs

**The official documentation site for the Struxa project.**
Built with Fumadocs — fast, searchable, and statically exported.

<br />

![Last commit](https://www.shieldcn.dev/github/last-commit/struxadotcloud/docs.svg?variant=secondary&size=sm)
![Open issues](https://www.shieldcn.dev/github/open-issues/struxadotcloud/docs.svg?variant=secondary&size=sm)
![License · ELv2](https://www.shieldcn.dev/badge/License-ELv2-000000.svg?variant=secondary&size=sm)

![Package mgr · Bun](https://www.shieldcn.dev/badge/Package_mgr-Bun-000000.svg?logo=bun&variant=branded&size=sm)
![Language · TypeScript](https://www.shieldcn.dev/badge/Language-TypeScript-3178C6.svg?logo=typescript&variant=branded&size=sm)
![Built with · Fumadocs](https://www.shieldcn.dev/badge/Built_with-Fumadocs-000000.svg?logo=readthedocs&variant=branded&size=sm)

</div>

<br />

## What is this?

This is the documentation site for [Struxa](https://github.com/struxadotcloud/struxa) — a self-hosted game server management panel. It covers installation, configuration, API reference, and node setup for both the main panel and [Wings](https://github.com/struxadotcloud/wings).

The site is built with [Fumadocs](https://fumadocs.dev) on top of Next.js 16 with static export, making it deployable anywhere as plain HTML.

## Related repositories

| Repository | Description |
|---|---|
| [struxadotcloud/struxa](https://github.com/struxadotcloud/struxa) | Main panel — web UI, API, database |
| [struxadotcloud/wings](https://github.com/struxadotcloud/wings) | Node agent — server lifecycle, file management, SFTP |
| [struxadotcloud/docs](https://github.com/struxadotcloud/docs) | This repo — documentation site |

## Getting Started

**Prerequisites:** [Bun](https://bun.sh) `>= 1.3.5`

```bash
# Clone the repo
git clone https://github.com/struxadotcloud/docs.git
cd docs

# Install dependencies
bun install

# Start the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

<details>
<summary>All available scripts</summary>

| Command | Description |
|---|---|
| `bun run dev` | Start the development server |
| `bun run build` | Build and statically export the site |
| `bun run start` | Serve the static export locally |
| `bun run types:check` | TypeScript type check |
| `bun run lint` | Lint with Oxlint |

</details>

## Project Structure

| Path | Description |
|---|---|
| `content/docs/` | MDX documentation pages |
| `src/app/(home)` | Landing page and top-level routes |
| `src/app/docs` | Documentation layout and pages |
| `src/app/api/search` | Full-text search route handler |
| `src/lib/source.ts` | Content source adapter |
| `source.config.ts` | Fumadocs MDX configuration |

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) + [React 19](https://react.dev) |
| Docs engine | [Fumadocs](https://fumadocs.dev) |
| Content | MDX via `fumadocs-mdx` |
| Search | [Orama](https://orama.com) (client-side, static) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Language | TypeScript (strict) |
| Runtime | [Bun](https://bun.sh) |
| Linting | Oxlint |

## Contributing

Content lives in `content/docs/` as MDX files. To add or update a page, edit the relevant file and open a pull request. For structural changes (navigation, layout, search) see the [Fumadocs docs](https://fumadocs.dev) for guidance.

## License

[Elastic License 2.0 (ELv2)](./LICENSE)

<br />

<div align="center">
  <sub>Part of the Struxa project.</sub>
</div>
