"use client";

import { motion } from "framer-motion";
import { Shield, Briefcase, HardHat, TrendingUp } from "lucide-react";

const roles = [
  {
    icon: Shield,
    title: "Admin",
    benefits: [
      "Full system configuration and user management",
      "Cross-project portfolio visibility",
      "Audit trail and compliance reporting",
    ],
  },
  {
    icon: Briefcase,
    title: "Project Manager",
    benefits: [
      "Real-time milestone and task tracking",
      "Delay analysis and risk identification",
      "Automated progress reports for stakeholders",
    ],
  },
  {
    icon: HardHat,
    title: "Site Engineer",
    benefits: [
      "Mobile-first task updates and photo capture",
      "Clear daily work assignments",
      "Quick issue reporting and escalation",
    ],
  },
  {
    icon: TrendingUp,
    title: "Management",
    benefits: [
      "Executive dashboards with key metrics",
      "Portfolio-level progress overview",
      "Early warning indicators for at-risk projects",
    ],
  },
];

export const RolesSection = () => {
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
            Role-Based Value
          </p>
          <h2 className="heading-section text-foreground mb-6">
            Tailored for every role in your organization.
          </h2>
          <p className="body-default">
            Sol-X delivers the right information to the right people. No noise, 
            just relevant data for your specific responsibilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card-elevated p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-5">
                <role.icon className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {role.title}
              </h3>
              <ul className="space-y-3">
                {role.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-amber-500 mt-2 shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
