import { HeroSection } from "@/components/hero-section";
import { OnlineReaders } from "@/components/online-readers";
import { LiveStreams } from "@/components/live-streams";
import { FeaturedProducts } from "@/components/featured-products";
import { PageContainer } from "@/components/page-container";

export default function HomePage() {
  return (
    <PageContainer>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Online Readers Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-alex-brush text-pink-400 mb-6 text-center">Readers Online Now</h2>
        <OnlineReaders />
      </section>
      
      {/* Live Streams Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-alex-brush text-pink-400 mb-6 text-center">Live Readings</h2>
        <LiveStreams />
      </section>
      
      {/* Shop Section */}
      <section className="mt-16 mb-20">
        <h2 className="text-3xl font-alex-brush text-pink-400 mb-6 text-center">Featured Products</h2>
        <FeaturedProducts />
      </section>
    </PageContainer>
  );
} 