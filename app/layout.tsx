import './globals.css';
import type { Metadata } from 'next';
import { Cormorant, Italianno, Quicksand } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
});

const italianno = Italianno({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-italianno',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-quicksand',
});

export const metadata: Metadata = {
  title: 'Jewellect — Timeless Luxury Fashion',
  description: 'Curated luxury fashion for the modern woman. Discover our collection of refined clothing and accessories.',
  openGraph: {
    title: 'Jewellect — Timeless Luxury Fashion',
    description: 'Curated luxury fashion for the modern woman.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?fit=crop&w=1200&h=630',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${italianno.variable} ${quicksand.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
