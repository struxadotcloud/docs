import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      tabMode="navbar"
      tabs={[
        { title: 'Docs', url: '/docs' },
        { title: 'Extensions', url: '/docs/extensions' },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
