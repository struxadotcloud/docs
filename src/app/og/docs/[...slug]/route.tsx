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

// ponytail: deterministic PRNG (not crypto-secure) — fine for a decorative glyph scatter
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GLYPHS = ['.', ':', '^', 'x', 's', 'S', '#', '$'];

// Dense right-side glyph dither matching the marketing banner's noise field.
function GlyphField({ seed, width, height }: { seed: number; width: number; height: number }) {
  const rand = mulberry32(seed);
  const cell = 14;
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // density ramps up left-to-right, plus a soft fade at top/bottom edges
      const xFrac = c / cols;
      const yEdge = Math.min(r / rows, 1 - r / rows);
      const density = Math.pow(xFrac, 1.4) * Math.min(yEdge * 4, 1);
      if (rand() > density) continue;
      cells.push(
        <div
          key={`${r}-${c}`}
          style={{
            position: 'absolute',
            left: c * cell,
            top: r * cell,
            fontSize: `${10 + Math.floor(rand() * 4)}px`,
            color: `rgba(59, 130, 246, ${0.2 + rand() * 0.6})`,
            fontFamily: 'Funnel Display',
          }}
        >
          {GLYPHS[Math.floor(rand() * GLYPHS.length)]}
        </div>,
      );
    }
  }
  return <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>{cells}</div>;
}

function OGImage({ title, description }: { title: string; description?: string }) {
  const fontSize = title.length > 30 ? '58px' : title.length > 20 ? '68px' : '80px';
  const words = title.split(' ');
  const lastWord = words.length > 1 ? words.pop() : undefined;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#0a0a0a',
        padding: '64px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* glyph scatter, right edge */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '420px', height: '630px', display: 'flex' }}>
        <GlyphField seed={title.length * 7919 + title.charCodeAt(0)} width={420} height={630} />
      </div>
      {/* left-side fade so the field reads as a texture, not a hard block */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, #0a0a0a 55%, transparent 78%)',
          display: 'flex',
        }}
      />

      {/* logo + wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={28} height={28} alt="" />
        <span style={{ fontSize: '20px', fontWeight: 600, color: '#fafafa', fontFamily: 'Funnel Display' }}>struxa</span>
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
            fontSize,
            fontWeight: 700,
            color: '#fafafa',
            fontFamily: 'Funnel Display',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            display: 'flex',
            gap: '0.28em',
          }}
        >
          {words.length > 0 && <span>{words.join(' ')}</span>}
          {lastWord && <span style={{ color: '#3b82f6' }}>{lastWord}</span>}
        </div>

        {description && (
          <div
            style={{
              fontSize: '24px',
              color: '#71717a',
              fontFamily: 'Funnel Display',
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: '760px',
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

  // ponytail: Google Fonts fetch can flake in dev — fall back to satori's default font rather than 500ing
  const fonts = await Promise.all([
    loadFont('Funnel+Display', 400),
    loadFont('Funnel+Display', 600),
    loadFont('Funnel+Display', 700),
  ])
    .then(([regular, semiBold, bold]) => [
      { name: 'Funnel Display', data: regular, weight: 400 as const, style: 'normal' as const },
      { name: 'Funnel Display', data: semiBold, weight: 600 as const, style: 'normal' as const },
      { name: 'Funnel Display', data: bold, weight: 700 as const, style: 'normal' as const },
    ])
    .catch(() => []);

  return new ImageResponse(
    <OGImage title={page.data.title} description={page.data.description} />,
    { width: 1200, height: 630, fonts },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
