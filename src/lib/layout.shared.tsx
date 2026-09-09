import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { gitConfig } from './shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <Image
            src="/brand/wordmark-dark.png"
            alt="struxa"
            width={100}
            height={20}
            className="hidden dark:block"
            style={{ width: 100, height: 20 }}
            priority
            unoptimized
          />
          <Image
            src="/brand/wordmark-light.png"
            alt="struxa"
            width={100}
            height={20}
            className="block dark:hidden"
            style={{ width: 100, height: 20 }}
            priority
            unoptimized
          />
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
