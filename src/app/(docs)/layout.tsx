import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/notebook';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      {...baseOptions()}
      sidebar={{ collapsible: false }}
      tabMode="navbar"
      tabs={[
        { title: 'Docs', url: '/' },
        { title: 'Billing', url: '/billing' },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
