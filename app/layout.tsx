import './globals.css';
import type { Metadata } from 'next';
import { Cormorant, Italianno, Quicksand } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import CartHydration from '@/components/CartHydration';

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
  title: 'HER — For All Women | Luxury Feminine Fashion',
  description: 'Timeless. Refined. Hers. Discover our curated collection of luxury feminine clothing for the woman of quiet luxury.',
  openGraph: {
    title: 'HER — For All Women | Luxury Feminine Fashion',
    description: 'Timeless. Refined. Hers. Discover our curated collection of luxury feminine clothing.',
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
        <CartHydration />
        {children}
      </body>
    </html>
  );
}
