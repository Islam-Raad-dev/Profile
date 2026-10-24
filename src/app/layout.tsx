import type { Metadata } from 'next';
import { Inter, Archivo_Black, Permanent_Marker, Cairo, Caveat } from 'next/font/google';
import { INIT_SCRIPT } from '@/lib/scripts';
import { LangProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const archivo = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const permanentMarker = Permanent_Marker({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marker',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Islam Raad - AI Engineer',
  description:
    'Portfolio of Islam Raad, an AI Engineering student at the University of Mosul who builds AI-powered applications and backend systems.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${inter.variable} ${archivo.variable} ${permanentMarker.variable} ${cairo.variable} ${caveat.variable}`}
    >
      <head>
        <script
          id="init-script"
          dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LangProvider>{children}</LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
