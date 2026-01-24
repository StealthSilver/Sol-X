"use client";

import { Button } from "@/components/ui/button";
import { GanttVisualization } from "../GanttVisualization";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900 via-charcoal-900 to-charcoal-700/50" />

      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-700/50 border border-charcoal-500/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-gray-400 font-medium">
                Trusted by infrastructure teams
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="heading-display text-foreground"
            >
              Project execution,{" "}
              <span className="text-gradient-amber">under control.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-large max-w-xl"
            >
              Sol-X is the project monitoring platform built for renewable
              energy infrastructure. Track milestones, manage delays, and
              capture real evidence from concept to commissioning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="https://sol-x-main.vercel.app/login">
                <Button variant="hero" size="xl">
                  Get Started
                  <ArrowRight className="ml-1" size={18} />
                </Button>
              </a>
              <Button variant="heroOutline" size="xl">
                View Capabilities
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-charcoal-500 border-2 border-charcoal-900 flex items-center justify-center"
                    >
                      <span className="text-xs text-gray-400">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  <span className="text-foreground font-medium">250+</span>{" "}
                  projects tracked
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right: Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="card-elevated p-6 lg:p-8">
              <GanttVisualization />
            </div>

            {/* Floating data cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              className="absolute -bottom-4 -left-4 lg:-left-8 card-elevated p-4 max-w-[200px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-success/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-success"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="22,4 12,14.01 9,11.01"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Milestone Complete</p>
                  <p className="text-sm text-foreground font-medium">
                    Foundation Works
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.8 }}
              className="absolute -top-4 -right-4 lg:-right-8 card-elevated p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-amber-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21,15 16,10 5,21" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Photos Today</p>
                  <p className="text-sm text-foreground font-medium">
                    24 uploaded
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
