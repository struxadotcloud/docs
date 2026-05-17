import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <Image
            src="/logo-white.svg"
            alt="struxa"
            width={18}
            height={18}
            className="hidden dark:block"
            priority
          />
          <Image
            src="/logo.svg"
            alt="struxa"
            width={18}
            height={18}
            className="block dark:hidden"
            priority
          />
          <span
            style={{
              fontFamily: 'var(--font-cal-sans)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--color-fd-foreground)',
            }}
          >
            {appName}
          </span>
        </span>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
