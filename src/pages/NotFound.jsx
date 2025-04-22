import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaRobot } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi"; // AI Brain Icon

const NotFound = () => {
  const { t } = useTranslation();

  const colors = {
    primary: "#76B900",
    secondary: "#2C3E50",
    accent: "#E74C3C",
    textDark: "#333333",
    textLight: "#FFFFFF",
    background: "white",
    cardBg: "#F8F9FA"
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ backgroundColor: colors.bg }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center p-10 rounded-2xl shadow-xl border-4"
        style={{
          borderColor: colors.primary,
          backgroundColor: colors.secondary,
        }}
      >
        {/* 404 Title with AI Icon */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold" style={{ color: colors.primary }}>
            404
          </h1>
          <GiArtificialIntelligence className="absolute top-0 right-0 text-7xl text-gray-500 opacity-40" />
          <GiArtificialIntelligence className="absolute bottom-0 left-0 text-7xl text-gray-500 opacity-40 rotate-180" />
        </div>

        {/* Animated AI Robot Head */}
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-6 text-8xl"
          style={{ color: colors.accent }}
        >
          <FaRobot />
        </motion.div>

        {/* Message */}
        <h2 className="mt-6 text-4xl font-bold" style={{ color: colors.primary }}>
          {t("Lost in the Deep Arena?")}
        </h2>
        <p className="mt-2 text-lg text-gray-300">
          {t("The AI couldn't find this page. Let's get you back!")}
        </p>

        {/* Glowing Return Button */}
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <Link
            to="/"
            className="mt-6 inline-block px-8 py-3 text-lg font-semibold rounded-full transition-all"
            style={{
              backgroundColor: colors.accent,
              color: "black",
              boxShadow: "0px 0px 20px rgba(0, 229, 255, 0.8)",
            }}
          >
            {t("Return to Deep Arena")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
