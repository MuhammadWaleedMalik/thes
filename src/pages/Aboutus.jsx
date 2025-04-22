import React from "react";
import { useTranslation } from "react-i18next";
import { GraduationCap, BookOpenCheck, Brain, Users } from "lucide-react";

// ThesisAI Color Palette
const colors = {
  primary: "#76B900",
  secondary: "#2C3E50",
  accent: "#E74C3C",
  textDark: "#333333",
  textLight: "#FFFFFF",
  background: "#FFFFFF",
  cardBg: "#F8F9FA"
};

const features = [
  {
    icon: <BookOpenCheck size={32} className="text-[#76B900]" />,
    title: "AI-Powered Literature Review",
    description:
      "Search, summarize, and identify gaps in academic literature with intelligent recommendations and citation management."
  },
  {
    icon: <GraduationCap size={32} className="text-[#76B900]" />,
    title: "Methodology Assistant",
    description:
      "Design your research with tools for methodology selection, sampling strategies, ethics guidance, and statistical validation."
  },
  {
    icon: <Brain size={32} className="text-[#76B900]" />,
    title: "Writing Enhancement",
    description:
      "Improve clarity, tone, and structure with real-time academic writing suggestions, plagiarism detection, and referencing support."
  },
  {
    icon: <Users size={32} className="text-[#76B900]" />,
    title: "Team Collaboration Hub",
    description:
      "Collaborate in real-time with co-authors, leave threaded comments, manage roles, and track versions — all in one place."
  }
];

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{ backgroundColor: colors.background }}
      className="min-h-screen flex flex-col items-center px-6 md:px-12 py-20"
    >
      {/* Hero / Heading */}
      <h1
        className="text-5xl font-extrabold text-center mb-6"
        style={{ color: colors.primary }}
      >
        {t("Welcome to ThesisAI")}
      </h1>
      <p
        className="text-xl text-center max-w-5xl mb-12 leading-relaxed font-medium"
        style={{ color: colors.textDark }}
      >
        {t(
          "ThesisAI is your smart academic co-pilot — here to simplify your entire research process. Whether you're writing a thesis, publishing a paper, or just getting started, our AI tools support you from idea to submission."
        )}
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl mb-20">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow-md border transition-all hover:shadow-xl"
            style={{ backgroundColor: colors.cardBg, borderColor: colors.primary }}
          >
            <div className="flex items-center gap-4 mb-4">{feature.icon}
              <h3 className="text-2xl font-bold" style={{ color: colors.secondary }}>
                {t(feature.title)}
              </h3>
            </div>
            <p className="text-md" style={{ color: colors.textDark }}>
              {t(feature.description)}
            </p>
          </div>
        ))}
      </div>

      {/* How It Works */}
      <div className="w-full max-w-4xl mb-20 text-center">
        <h2
          className="text-4xl font-bold mb-6"
          style={{ color: colors.primary }}
        >
          {t("How ThesisAI Works")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              step: "1. Start with a Goal",
              detail: "Choose your task: Literature review, method design, writing draft, or collaboration."
            },
            {
              step: "2. Let AI Assist You",
              detail: "Our tools offer real-time support, tailored suggestions, and research-specific insights."
            },
            {
              step: "3. Refine and Collaborate",
              detail: "Edit, manage citations, export results, and work with your team in one unified space."
            }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-[#F0F4F8] rounded-xl shadow-sm border-l-4 border-[#76B900]">
              <h4 className="text-xl font-semibold mb-2 text-[#2C3E50]">{t(item.step)}</h4>
              <p className="text-sm text-[#333333]">{t(item.detail)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <h3 className="text-3xl font-bold mb-4" style={{ color: colors.secondary }}>
          Ready to accelerate your research?
        </h3>
        <p className="text-lg mb-6" style={{ color: colors.textDark }}>
          Join thousands of students and scholars using ThesisAI to save time and write smarter.
        </p>
        <a
          href="/signup"
          className="px-6 py-3 bg-[#76B900] text-white rounded-full font-semibold text-lg shadow-md hover:bg-[#5aa800] transition"
        >
          Get Started Now
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
