"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative card-elevated p-12 lg:p-16 text-center overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="heading-section text-foreground mb-6 max-w-2xl mx-auto">
              Bring clarity to your project execution.
            </h2>
            <p className="body-large max-w-xl mx-auto mb-8">
              See how Sol-X can transform the way your team delivers renewable
              energy infrastructure projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://sol-x-main.vercel.app/login">
                <Button variant="hero" size="xl">
                  Get Started
                  <ArrowRight className="ml-1" size={18} />
                </Button>
              </a>
              <Button variant="heroOutline" size="xl">
                Read Docs
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-8">
              No commitment required. Schedule a 30-minute walkthrough with our
              team.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
