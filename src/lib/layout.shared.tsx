import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';
import Image from 'next/image';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <Image
            src="https://struxa.cloud/images/brand/icon-whiteblue.png"
            alt="struxa"
            width={18}
            height={18}
            className="hidden dark:block"
            style={{ width: 18, height: 18 }}
            priority
          />
          <Image
            src="https://struxa.cloud/images/brand/icon-bluebg.png"
            alt="struxa"
            width={18}
            height={18}
            className="block dark:hidden"
            style={{ width: 18, height: 18 }}
            priority
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              lineHeight: 1,
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
