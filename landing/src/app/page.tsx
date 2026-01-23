import { Navbar } from "./components/sections/Navbar";
import { HeroSection } from "./components/sections/Hero";
import { TrustSection } from "./components/sections/Trust";
import { ProblemSolutionSection } from "./components/sections/ProblemSolution";
import { CapabilitiesSection } from "./components/sections/Capabilities";
import { HowItWorksSection } from "./components/sections/HowItWorks";
import { RolesSection } from "./components/sections/Roles";
import { ProductProofSection } from "./components/sections/ProductProof";
import { SecuritySection } from "./components/sections/Security";
import { CTASection } from "./components/sections/CTA";
import { Footer } from "./components/sections/Footer";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Sol-X",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Project execution platform for renewable energy infrastructure. Track milestones, manage tasks, capture photo evidence, and generate automated reports for solar, wind, and hybrid energy projects.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "127",
  },
  featureList: [
    "Project Lifecycle Tracking",
    "Task & Milestone Management",
    "Photo Evidence Capture",
    "Automated Reporting",
    "Role-Based Dashboards",
    "Analytics & Insights",
  ],
  provider: {
    "@type": "Organization",
    name: "Sol-X",
    url: "https://solx.com",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
