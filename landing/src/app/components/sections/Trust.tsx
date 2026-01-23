"use client";

import { motion } from "framer-motion";
import { Sun, Wind, Zap, Battery } from "lucide-react";

const projectTypes = [
  { icon: Sun, label: "Solar", description: "Utility & commercial scale" },
  { icon: Wind, label: "Wind", description: "Onshore & offshore projects" },
  { icon: Zap, label: "Hybrid", description: "Combined renewable systems" },
  { icon: Battery, label: "Storage", description: "Battery energy systems" },
];

export const TrustSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-charcoal-700/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-4">
            Built for Renewable Energy
          </p>
          <h2 className="heading-section text-foreground mb-6">
            From concept to commissioning, every project type covered.
          </h2>
          <p className="body-default">
            Sol-X is engineered specifically for the complexities of renewable
            energy infrastructure. No generic project tools—just purpose-built
            execution management.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectTypes.map((type, index) => (
            <motion.div
              key={type.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group card-elevated p-6 hover:border-amber-500/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-charcoal-500/50 flex items-center justify-center mb-4 group-hover:bg-amber-500/10 transition-colors duration-300">
                <type.icon className="w-6 h-6 text-gray-400 group-hover:text-amber-500 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {type.label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {type.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-16 border-t border-border/50"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                5.2 GW
              </p>
              <p className="text-sm text-muted-foreground">Capacity Tracked</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                250+
              </p>
              <p className="text-sm text-muted-foreground">Projects Managed</p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                98.5%
              </p>
              <p className="text-sm text-muted-foreground">
                On-Time Milestones
              </p>
            </div>
            <div>
              <p className="text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                12
              </p>
              <p className="text-sm text-muted-foreground">Countries Active</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
