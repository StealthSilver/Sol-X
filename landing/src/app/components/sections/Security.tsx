"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck, Server } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Role-Based Access Control",
    description:
      "Granular permissions ensure users see only what they need. Configurable by project, role, and function.",
  },
  {
    icon: FileCheck,
    title: "Complete Audit Trail",
    description:
      "Every action logged with user, timestamp, and context. Full traceability for compliance requirements.",
  },
  {
    icon: Lock,
    title: "Secure Data Handling",
    description:
      "End-to-end encryption, secure cloud infrastructure, and regular security assessments.",
  },
  {
    icon: Server,
    title: "Enterprise-Ready Infrastructure",
    description:
      "99.9% uptime SLA, automated backups, and dedicated support for enterprise deployments.",
  },
];

export const SecuritySection = () => {
  return (
    <section id="security" className="py-20 lg:py-28 bg-charcoal-700/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-4">
            Security & Reliability
          </p>
          <h2 className="heading-section text-foreground mb-6">
            Enterprise-grade security, built in.
          </h2>
          <p className="body-default">
            Sol-X is designed for infrastructure teams who demand reliability,
            security, and compliance. Your project data is protected at every
            level.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex gap-5 card-elevated p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-charcoal-500/50 flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
