import { motion } from "framer-motion";
import {
  BarChart3,
  CheckSquare,
  Camera,
  FileText,
  Users,
  Calendar,
} from "lucide-react";

const capabilities = [
  {
    icon: Calendar,
    title: "Project Lifecycle Tracking",
    description:
      "Monitor every phase from site assessment through commissioning with clear milestone visibility.",
  },
  {
    icon: CheckSquare,
    title: "Task & Milestone Management",
    description:
      "Assign, track, and close tasks with dependencies. Never lose sight of critical path items.",
  },
  {
    icon: Camera,
    title: "Photo Evidence Capture",
    description:
      "Timestamped, geotagged photos linked to milestones. Build an auditable visual record.",
  },
  {
    icon: FileText,
    title: "Automated Reporting",
    description:
      "Generate progress reports, delay analyses, and executive summaries without manual effort.",
  },
  {
    icon: Users,
    title: "Role-Based Dashboards",
    description:
      "Tailored views for site engineers, project managers, and executives. See what matters to you.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Track performance metrics, identify bottlenecks, and forecast completion with data-driven clarity.",
  },
];

export const CapabilitiesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-charcoal-700/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-4">
            Core Capabilities
          </p>
          <h2 className="heading-section text-foreground mb-6">
            Everything you need to execute with precision.
          </h2>
          <p className="body-default">
            Sol-X consolidates project tracking, evidence capture, and reporting
            into a single platform built for renewable energy execution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group card-elevated p-6 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-charcoal-500/50 flex items-center justify-center mb-5 group-hover:bg-amber-500/10 transition-colors duration-300">
                <capability.icon className="w-6 h-6 text-gray-400 group-hover:text-amber-500 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {capability.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {capability.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
