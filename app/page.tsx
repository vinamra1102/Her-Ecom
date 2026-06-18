import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NewArrivals from '@/components/NewArrivals';
import EditorialBanner from '@/components/EditorialBanner';
import CategoryCards from '@/components/CategoryCards';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Jewellect — Timeless Luxury Fashion',
  description: 'Curated luxury fashion for the modern woman.',
};

export default function Home() {
  return (
    <main className="w-full">
      <Navbar />
      <Hero />
      <NewArrivals />
      <EditorialBanner />
      <CategoryCards />
      <Footer />
    </main>
  );
}
