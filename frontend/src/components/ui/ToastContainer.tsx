import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, Info, X } from "lucide-react";
import {
  useNotificationStore,
  type NotificationType,
} from "../../store/notificationStore";

const notificationConfig = {
  success: {
    icon: CheckCircle,
    color: "#10B981",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
  },
  warning: {
    icon: AlertTriangle,
    color: "#F59E0B",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
  },
  error: {
    icon: XCircle,
    color: "#EF4444",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
  },
  info: {
    icon: Info,
    color: "#404040",
    bgColor: "bg-slate-500/10",
    borderColor: "border-slate-500/30",
  },
};

interface ToastProps {
  id: string;
  type: NotificationType;
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const config = notificationConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.4,
        exit: {
          type: "tween",
          duration: 0.3,
          ease: "easeInOut",
        },
      }}
      className={`flex items-start gap-3 min-w-[320px] max-w-md p-4 rounded-lg border ${config.bgColor} ${config.borderColor} backdrop-blur-sm shadow-lg`}
    >
      <Icon className="flex-shrink-0 mt-0.5" size={20} color={config.color} />
      <p className="flex-1 text-sm text-gray-50 leading-relaxed">{message}</p>
      <button
        onClick={onClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-50 transition-colors"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <Toast
              id={notification.id}
              type={notification.type}
              message={notification.message}
              onClose={() => removeNotification(notification.id)}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
