import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Explore = () => {
  const { t } = useTranslation();

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
      title: "Analytical Thesis",
      description: "Deconstruct complex topics with AI-powered structural analysis and data interpretation tools.",
      icon: "📊",
      path: "/analytical-thesis",
      features: [
        "Data pattern recognition",
        "Statistical analysis",
        "Comparative frameworks",
        "Visualization tools"
      ]
    },
    {
      title: "Argumentative Thesis",
      description: "Build compelling arguments with evidence mapping and logical flow analysis.",
      icon: "⚖️",
      path: "/argumentative-thesis",
      features: [
        "Evidence organization",
        "Logical fallacy detection",
        "Persuasion scoring",
        "Counter-argument generator"
      ]
    },
    {
      title: "Historical Thesis",
      description: "Contextualize events with temporal mapping and primary source analysis.",
      icon: "📜",
      path: "/historical-thesis",
      features: [
        "Timeline generator",
        "Source credibility analysis",
        "Historiographical comparison",
        "Contextual linking"
      ]
    },
   
    {
      title: "Policy Thesis",
      description: "Develop recommendations with stakeholder analysis and impact projection.",
      icon: "🏛️",
      path: "/policy-thesis",
      features: [
        "Stakeholder mapping",
        "Impact forecasting",
        "Cost-benefit analysis",
        "Implementation planning"
      ]
    },
    {
      title: "Literature Review",
      description: "AI-powered source finding, summarization, and gap analysis.",
      icon: "📚",
      path: "/literature-review",
      features: [
        "Automated source recommendations",
        "Key point extraction",
        "Research gap identification",
        "Citation management"
      ]
    },
    
    {
      title: "Writing Enhancer",
      description: "Real-time academic writing suggestions and style improvements.",
      icon: "✍️",
      path: "/writing-tools",
      features: [
        "Tone adjustment",
        "Academic phrasing",
        "Structure optimization",
        "Plagiarism check"
      ]
    },
    
  
  ];

  const categories = [
    {
      name: "Thesis Types",
      description: "Specialized tools for different academic approaches",
      features: features.slice(0, 5)
    },
    {
      name: "Research Tools",
      description: "Essential utilities for academic work",
      features: features.slice(5, 9)
    },
    {
      name: "Productivity",
      description: "Features to streamline your workflow",
      features: features.slice(9)
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Hero Section */}
      <section className="py-20 px-6 text-center" style={{ background: `linear-gradient(135deg, ${colors.background} 0%, #F5F7FA 100%)` }}>
        <motion.h1
          style={{ color: colors.primary }}
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t("Explore ThesisAI")}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t("Discover all the tools and features designed to revolutionize your academic research and writing process.")}
        </motion.p>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                backgroundColor: colors.primary,
                color: colors.textLight
              }}
              className="px-6 py-3 rounded-lg font-semibold shadow-md"
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* All Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              <Link to={feature.path}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: `0 10px 25px -5px rgba(0,0,0,0.1)` }}
                  className="h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex items-start mb-4">
                      <div className="text-4xl mr-4" style={{ color: colors.primary }}>
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold" style={{ color: colors.secondary }}>
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span style={{ color: colors.primary }} className="mr-2">•</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div 
                    className="px-6 py-4 text-right"
                    style={{ backgroundColor: colors.cardBg }}
                  >
                    <span className="font-semibold" style={{ color: colors.primary }}>
                      Explore →
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6" style={{ color: colors.secondary }}>
            {t("Ready to transform your academic workflow?")}
          </h2>
          <Link
            to={"/signup"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: colors.primary,
              color: colors.textLight
            }}
            className="px-8 py-4 rounded-lg font-bold text-lg shadow-lg"
          >
            {t("Get Started with ThesisAI")}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Explore;