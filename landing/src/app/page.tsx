import { Navbar } from "./components/sections/Navbar";
import { HeroSection } from "./components/sections/Hero";
import { TrustSection } from "./components/sections/Trust";
import { ProblemSolutionSection } from "./components/sections/ProblemSolution";
import { CapabilitiesSection } from "./components/sections/Capabilities";
import { HowItWorksSection } from "./components/sections/HowItWorks";
import { RolesSection } from "./components/sections/Roles";
import { ProductProofSection } from "./components/sections/ProductProof";
import { SecuritySection } from "./components/sections/Security";

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal-900">
      <Navbar />
      <HeroSection />
      <TrustSection />
      <ProblemSolutionSection />
      <CapabilitiesSection />
      <HowItWorksSection />
      <RolesSection />
      <ProductProofSection />
      <SecuritySection />
    </main>
  );
}
