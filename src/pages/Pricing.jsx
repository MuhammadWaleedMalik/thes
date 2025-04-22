import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom"; // Add this import

const colors = {
  primary: "#95c11e",
  secondary: "#6b8e23",
  text: "white",
  background: "black",
};

const Pricing = () => {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize the navigate function

  const plans = [
    { id: "basic", name: t("basicPlan"), price: 24, duration: t("month"), route: "/pricing/basic" },
    { id: "pro", name: t("proPlan"), price: 49, duration: t("sixMonths"), isPopular: true, route: "/pricing/pro" },
    { id: "business", name: t("businessPlan"), price: 99, duration: t("year"), route: "/pricing/enterprise" },
  ];

  const features = [
    t("thesisStatementGenerator"),
    t("argumentEnhancement"),
    t("literatureReviewAssistant"),
    t("researchMethodologyGuidance"),
    t("citationFormatting"),
    t("plagiarismCheck"),
    t("chapterStructurePlanning"),
    t("academicToneImprover")
  ];

  const handlePlanSelect = (route) => {
    navigate(route); // Navigate to the selected plan's route
  };

  return (
    <div className="w-full px-6 sm:px-10 lg:px-12 py-24 flex flex-col items-center" style={{ backgroundColor: colors.background }}>
      {/* Header with Motion Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-4" style={{ color: colors.primary }}>Promote</h1>
        <h2 className="text-3xl font-semibold" style={{ color: colors.secondary }}>
          {t("AI PowerPoint Content, Analysis, and Templates Made Easy")}
        </h2>
      </motion.div>

      {/* Pricing Plans */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col md:flex-row justify-center gap-8"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full md:w-1/3 bg-transparent border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all relative"
            style={{ borderColor: colors.primary }}
          >
            {plan.isPopular && (
              <div className="absolute top-0 right-0 text-white text-xs font-bold px-3 py-1 rounded-bl-lg" style={{ backgroundColor: colors.primary }}>
                {t("mostPopular")}
              </div>
            )}
            <h3 className="text-2xl font-semibold mb-3" style={{ color: colors.secondary }}>
              {plan.name}
            </h3>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold" style={{ color: colors.primary }}>${plan.price}</span>
              <span className="text-gray-600 ml-2">/ {plan.duration}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start" style={{ color: colors.text }}>
                  <FiCheck className="mt-1 mr-2 flex-shrink-0" style={{ color: colors.primary }} />
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full text-lg px-6 py-3 rounded-lg font-bold transition-all"
              style={{ backgroundColor: colors.primary, color: "white" }}
              onClick={() => handlePlanSelect(plan.route)} // Add onClick handler
            >
              {t("choosePlan", { plan: plan.name })}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Pricing;