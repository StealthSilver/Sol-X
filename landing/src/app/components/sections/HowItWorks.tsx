import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Define Your Project",
    description:
      "Set up project parameters, milestones, and team roles. Import existing schedules or start fresh.",
  },
  {
    number: "02",
    title: "Track Execution",
    description:
      "Update task progress, log delays, and capture photo evidence directly from site using mobile or web.",
  },
  {
    number: "03",
    title: "Monitor & Report",
    description:
      "View real-time dashboards, receive automated alerts, and generate stakeholder reports instantly.",
  },
  {
    number: "04",
    title: "Commission with Confidence",
    description:
      "Arrive at commissioning with a complete audit trail, photo evidence, and verified milestone completion.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-4">
            How It Works
          </p>
          <h2 className="heading-section text-foreground mb-6">
            Four steps to controlled execution.
          </h2>
          <p className="body-default">
            Sol-X fits into your existing workflow. No complex onboarding—just
            structured project management from day one.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-charcoal-500/50 transform -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                  index % 2 === 0 ? "" : "lg:direction-rtl"
                }`}
              >
                {/* Content */}
                <div
                  className={`card-elevated p-6 lg:p-8 ${
                    index % 2 === 0 ? "lg:text-right" : "lg:col-start-2"
                  }`}
                >
                  <span className="text-amber-500 text-sm font-mono font-medium">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:flex absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-charcoal-900" />

                {/* Spacer for alternating layout */}
                {index % 2 === 0 ? <div className="hidden lg:block" /> : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
