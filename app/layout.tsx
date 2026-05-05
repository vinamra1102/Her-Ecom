import './globals.css';
import type { Metadata } from 'next';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'HER – For All Women | Luxury Feminine Fashion',
  description: 'Timeless. Refined. Hers. Discover our curated collection of luxury feminine clothing for the woman of quiet luxury.',
  openGraph: {
    title: 'HER – For All Women | Luxury Feminine Fashion',
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
    <html lang="en">
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
