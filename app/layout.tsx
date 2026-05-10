import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Dancing_Script } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-signature',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://bramasta.dev'),
  title: 'Bramasta — Portfolio',
  description: 'Portfolio of Bramasta, Full-Stack Developer & UI/UX Designer based in Bandung, Indonesia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        {/* Runs synchronously before first paint — hides content until splash exits */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem('splash-done'))document.documentElement.setAttribute('data-splash','pending')}catch(e){}`,
          }}
        />
      </head>
      <body className={`${plusJakarta.variable} ${dancingScript.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
