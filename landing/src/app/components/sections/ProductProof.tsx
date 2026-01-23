"use client";

import { motion } from "framer-motion";

export const ProductProofSection = () => {
  return (
    <section id="compare" className="py-20 lg:py-28">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-amber-500 text-sm font-medium uppercase tracking-wider mb-4">
            Product Interface
          </p>
          <h2 className="heading-section text-foreground mb-6">
            Built for clarity, not complexity.
          </h2>
          <p className="body-default">
            Every screen in Sol-X is designed to surface actionable information.
            No clutter—just the data you need to execute.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Gantt View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="card-elevated overflow-hidden"
          >
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                Gantt View
              </div>
              {[
                { name: "Site Prep", progress: 100 },
                { name: "Foundations", progress: 100 },
                { name: "Equipment", progress: 75 },
                { name: "Electrical", progress: 40 },
                { name: "Testing", progress: 0 },
              ].map((task, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">{task.name}</span>
                    <span className="text-gray-500">{task.progress}%</span>
                  </div>
                  <div className="h-2 bg-charcoal-500/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${task.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`h-full rounded-full ${
                        task.progress === 100
                          ? "bg-success"
                          : task.progress > 0
                            ? "bg-amber-500"
                            : "bg-charcoal-400"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card-elevated overflow-hidden"
          >
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                Photo Evidence
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-charcoal-500/50 rounded-lg flex items-center justify-center group hover:bg-charcoal-500 transition-colors"
                  >
                    <div className="text-center">
                      <svg
                        className="w-8 h-8 text-gray-500 mx-auto mb-1 group-hover:text-amber-500 transition-colors"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21,15 16,10 5,21" />
                      </svg>
                      <span className="text-[10px] text-gray-500">
                        Site {i}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/30 flex items-center justify-between">
                <span className="text-xs text-gray-500">24 photos today</span>
                <span className="text-xs text-amber-500">View all →</span>
              </div>
            </div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card-elevated overflow-hidden"
          >
            <div className="p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
                Analytics
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Schedule Variance
                  </span>
                  <span className="text-sm font-medium text-success">
                    +2 days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Tasks Complete</span>
                  <span className="text-sm font-medium text-foreground">
                    47/58
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Active Issues</span>
                  <span className="text-sm font-medium text-amber-500">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Photo Evidence</span>
                  <span className="text-sm font-medium text-foreground">
                    1,247
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-border/30">
                <div className="h-20 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 75, 85, 60, 95, 70, 88].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="flex-1 bg-amber-500/60 rounded-t hover:bg-amber-500 transition-colors"
                      />
                    ),
                  )}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-gray-500">Jan</span>
                  <span className="text-[10px] text-gray-500">Dec</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
