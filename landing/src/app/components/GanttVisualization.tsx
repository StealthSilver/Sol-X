"use client";

import { motion } from "framer-motion";

export const GanttVisualization = () => {
  const tasks = [
    { name: "Site Survey", progress: 100, color: "bg-green-500", delay: 0 },
    { name: "Foundation", progress: 100, color: "bg-green-500", delay: 0.1 },
    { name: "Panel Install", progress: 65, color: "bg-amber-500", delay: 0.2 },
    { name: "Electrical", progress: 30, color: "bg-blue-500", delay: 0.3 },
    { name: "Testing", progress: 0, color: "bg-gray-600", delay: 0.4 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-200">
          Solar Farm Alpha - Phase 1
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Progress:</span>
          <span className="text-sm font-medium text-amber-500">59%</span>
        </div>
      </div>

      {tasks.map((task, index) => (
        <motion.div
          key={task.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 + task.delay }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">{task.name}</span>
            <span className="text-xs text-gray-500">{task.progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${task.progress}%` }}
              transition={{
                duration: 0.8,
                delay: 0.8 + task.delay,
                ease: "easeOut",
              }}
              className={`h-full ${task.color} rounded-full`}
            />
          </div>
        </motion.div>
      ))}

      <div className="mt-6 pt-6 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs text-gray-500">Live updates</span>
        </div>
        <div className="text-xs text-gray-500">
          Last update: <span className="text-gray-400">2 min ago</span>
        </div>
      </div>
    </div>
  );
};
