import { Navbar } from "./components/sections/Navbar";
import { HeroSection } from "./components/sections/Hero";
import { TrustSection } from "./components/sections/Trust";
import { ProblemSolutionSection } from "./components/sections/ProblemSolution";
import { CapabilitiesSection } from "./components/sections/Capabilities";
import { HowItWorksSection } from "./components/sections/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal-900">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <ProblemSolutionSection />
      <CapabilitiesSection />
      <HowItWorksSection />
    </main>
  );
}
