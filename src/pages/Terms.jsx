import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// ThesisAI color palette
const colors = {
  primary: "#76B900",
  secondary: "#2C3E50",
  accent: "#E74C3C",
  textDark: "#333333",
  textLight: "#FFFFFF",
  background: "#FFFFFF",
  cardBg: "#F8F9FA"
};

// Updated Terms for ThesisAI
const terms = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By using ThesisAI, you agree to abide by our terms and policies. Continued use of the platform indicates your acceptance. We reserve the right to modify these terms at any time, and it is your responsibility to stay updated. Failure to comply may result in account suspension or termination."
  },
  {
    title: "2. AI-Powered Assistance",
    content:
      "Our AI tools provide intelligent support for literature review, methodology planning, writing, and collaboration. Users must interact responsibly and avoid misuse, including generating harmful, offensive, or misleading content."
  },
  {
    title: "3. Content Creation Ethics",
    content:
      "Content generated through ThesisAI tools should align with academic integrity and ethical research standards. Plagiarism or misrepresentation of AI-generated content is prohibited and may lead to restricted access."
  },
  {
    title: "4. Team Collaboration Tools",
    content:
      "Collaboration features are intended for productive academic teamwork. Misuse such as spamming, impersonation, or unauthorized access may result in suspension or permanent bans."
  },
  {
    title: "5. Data and Privacy",
    content:
      "ThesisAI collects usage data to improve platform performance. Personal and research data are handled with strict confidentiality. Users are encouraged to review our privacy policy for more details."
  }
];

const Terms = () => {
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
        {t("Terms & Conditions")}
      </motion.h1>

      {/* Terms Section */}
      <div className="w-full max-w-4xl space-y-10">
        {terms.map((term, index) => (
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
              {t(term.title)}
            </h3>
            <p className="text-lg" style={{ color: colors.textDark }}>
              {t(term.content)}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Terms;
