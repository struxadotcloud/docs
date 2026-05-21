import { getPageImage, source } from '@/lib/source';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';

const logo = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), 'public/logo-white.svg')).toString('base64')}`;

export const revalidate = false;

async function loadFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
    { headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 4.0.3; HTC Desire X Build/IML74K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30' } },
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\)/)?.[1];
  if (!url) throw new Error(`Failed to load font: ${family} ${weight}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

function OGImage({ title, description }: { title: string; description?: string }) {
  const fontSize = title.length > 30 ? '58px' : title.length > 20 ? '68px' : '80px';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#09090b',
        padding: '64px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #27272a 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          display: 'flex',
        }}
      />
      {/* vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 35%, #09090b 100%)',
          display: 'flex',
        }}
      />

      {/* logo */}
      <div style={{ display: 'flex', position: 'relative', zIndex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={40} height={40} style={{ opacity: 1 }} alt="" />
      </div>

      {/* main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '3px',
            backgroundColor: '#ffffff20',
            borderRadius: '2px',
            marginBottom: '28px',
            display: 'flex',
          }}
        />

        <div
          style={{
            fontSize,
            fontWeight: 600,
            color: '#fafafa',
            fontFamily: 'Inter',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}
        >
          {title}
        </div>

        {description && (
          <div
            style={{
              fontSize: '24px',
              color: '#71717a',
              fontFamily: 'Inter',
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: '860px',
            }}
          >
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const [interRegular, interSemiBold] = await Promise.all([
    loadFont('Inter', 400),
    loadFont('Inter', 600),
  ]);

  return new ImageResponse(
    <OGImage title={page.data.title} description={page.data.description} />,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interSemiBold, weight: 600, style: 'normal' },
      ],
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
