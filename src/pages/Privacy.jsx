import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ThesisAI color scheme
const colors = {
  primary: "#76B900",
  secondary: "#2C3E50",
  accent: "#E74C3C",
  textDark: "#333333",
  textLight: "#FFFFFF",
  background: "#FFFFFF",
  cardBg: "#F8F9FA"
};

const privacyPolicies = [
  {
    title: "📜 Data Collection & Usage",
    content:
      "ThesisAI collects only essential data to provide features like literature analysis, writing enhancement, and collaboration. No user data is sold or shared with third parties."
  },
  {
    title: "🔒 Secure Data Handling",
    content:
      "All personal and academic information is securely processed using modern encryption standards. We ensure data privacy and confidentiality across all features."
  },
  {
    title: "🤖 AI Training Transparency",
    content:
      "To improve our models, anonymized usage data may be used for AI training. Users may opt out via their account settings."
  },
  {
    title: "🖋️ Content Ownership",
    content:
      "Users retain full rights to all AI-assisted outputs including writing drafts, summaries, citations, and research designs. ThesisAI does not claim ownership."
  },
  {
    title: "🛠️ Third-Party Integrations",
    content:
      "We may integrate trusted tools (e.g., citation managers, cloud storage) to enhance functionality. These services adhere to strong privacy agreements."
  },
  {
    title: "📅 Policy Updates",
    content:
      "This policy may evolve as ThesisAI grows. Users will be notified of any major changes, and continued use indicates acceptance of updates."
  }
];

const Privacy = () => {
  const { t } = useTranslation();

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 md:px-12 py-20"
      style={{ backgroundColor: colors.background }}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-5xl font-extrabold text-center mb-12"
        style={{ color: colors.primary }}
      >
        {t("Privacy Policy")}
      </motion.h1>

      {/* Policy Cards */}
      <div className="w-full max-w-4xl space-y-10">
        {privacyPolicies.map((policy, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="p-8 rounded-xl shadow-lg border-l-8"
            style={{
              backgroundColor: colors.cardBg,
              borderColor: colors.primary
            }}
          >
            <h3
              className="text-3xl font-bold mb-3"
              style={{ color: colors.secondary }}
            >
              {t(policy.title)}
            </h3>
            <p className="text-lg" style={{ color: colors.textDark }}>
              {t(policy.content)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Privacy;
