import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const colors = {
  primary: "#00A6FB", // Deep Blue
  secondary: "#001B44", // Dark Background
  textLight: "#FFFFFF", // White Text
  accent: "#00E5FF", // Neon Cyan
};

// AI Features Data
const getAIFeatures = (t) => [
  {
    id: 'ai-chatbot',
    title: t('aiChatbot', 'AI Chatbot'),
    description: 'Engage in intelligent conversations with our AI-powered chatbot, trained to provide insightful responses.',
    imageUrl: 'https://source.unsplash.com/featured/?robot,ai',
    path: '/deep-arena/chatbot',
  },
  {
    id: 'image-creation',
    title: t('imageCreation', 'AI Image Creation'),
    description: 'Generate high-quality AI-powered images based on your descriptions and ideas.',
    imageUrl: 'https://source.unsplash.com/featured/?digitalart,ai',
    path: '/deep-arena/image-creator',
  },
  {
    id: 'ai-comparison',
    title: t('aiComparison', 'AI Comparison'),
    description: 'Compare chatbot performances side by side to evaluate response accuracy and efficiency.',
    imageUrl: 'https://source.unsplash.com/featured/?technology,comparison',
    path: '/deep-arena/ai-comparison',
  },
  {
    id: 'voice-generation',
    title: t('voiceGeneration', 'AI Voice Generation'),
    description: 'Convert text into natural-sounding speech with AI-driven voice synthesis.',
    imageUrl: 'https://source.unsplash.com/featured/?sound,waveform',
    path: '/deep-arena/voice-generator',
  }
];

const AIFeatures = () => {
  const { t } = useTranslation();
  const features = getAIFeatures(t);

  return (
    <div
      className="w-full flex flex-col items-center px-6 py-24"
      style={{ backgroundColor: colors.secondary, color: colors.textLight }}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-[50px] font-extrabold mb-4" style={{ color: colors.primary }}>
          Deep Arena
        </h1>
        <h2 className="text-3xl font-semibold" style={{ color: colors.accent }}>
          {t("AI-Powered Features")}
        </h2>
      </motion.div>

      {/* AI Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              to={feature.path}
              className="block rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent"
              style={{
                backgroundColor: colors.secondary,
                boxShadow: `0px 0px 15px rgba(0, 229, 255, 0.5)`,
              }}
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.accent }}>
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIFeatures;
