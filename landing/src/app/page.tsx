import { Navbar } from "./components/sections/Navbar";
import { HeroSection } from "./components/sections/Hero";
import { TrustSection } from "./components/sections/Trust";

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal-900">
      <Navbar />
      <HeroSection />
      <TrustSection />
    </main>
  );
}
