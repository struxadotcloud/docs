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
        { title: 'Docs', url: '/' },
        { title: 'Extensions', url: '/extensions' },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
