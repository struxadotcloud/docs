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

The documentation site for [Struxa](https://github.com/struxadotcloud/struxa) — covers installation, configuration, API reference, and node setup. Built with [Fumadocs](https://fumadocs.dev) on Next.js 16 with static export.

## Related repositories

| Repository | Description |
|---|---|
| [struxadotcloud/struxa](https://github.com/struxadotcloud/struxa) | Main panel — web UI, API, database |
| [struxadotcloud/wings](https://github.com/struxadotcloud/wings) | Node agent — server lifecycle, file management, SFTP |
| [struxadotcloud/install](https://github.com/struxadotcloud/install) | One-command installer |
| [struxadotcloud/docs](https://github.com/struxadotcloud/docs) | This repo — documentation site |

## Getting Started

**Prerequisites:** [Bun](https://bun.sh) `>= 1.3.5`

```bash
git clone https://github.com/struxadotcloud/docs.git
cd docs
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contributing

Content lives in `content/docs/` as MDX files. To add or update a page, edit the relevant file and open a pull request. For structural changes see the [Fumadocs docs](https://fumadocs.dev) for guidance.

## License

[Elastic License 2.0 (ELv2)](./LICENSE)

<br />

<div align="center">
  <sub>Part of the Struxa project.</sub>
</div>
