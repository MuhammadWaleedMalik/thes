import React from "react";
import { useTranslation } from "react-i18next";

const colors = {
  primary: "#00A6FB",
  secondary: "#00246B",
  textLight: "#FFFFFF",
  background: "#001B44"
};

const blogs = [
  {
    title: "AI-Powered Chatbot",
    content: "Deep Arena’s AI-powered chatbot provides instant, intelligent responses designed to improve user interactions. Whether you're looking for quick answers, engaging conversations, or assistance with tasks, our chatbot is optimized for seamless performance. It continuously learns from interactions to provide more accurate, human-like responses, making it an invaluable tool for customer support, education, and entertainment. Experience a smarter way to communicate with AI that understands context and delivers precise answers."
  },
  {
    title: "Image Creation",
    content: "Deep Arena brings your creativity to life with AI-generated image creation. With advanced machine learning models, you can generate high-quality images based on descriptions, artistic preferences, or specific themes. Whether you need stunning visuals for marketing, social media, or presentations, our AI ensures exceptional results. The tool is designed to understand intricate details and create images that match your vision perfectly, saving time and effort in design tasks."
  },
  {
    title: "Side-by-Side Chatbot Performance",
    content: "Deep Arena introduces a revolutionary way to compare AI chatbot performance in real time. Our unique side-by-side chatbot comparison tool allows users to analyze multiple AI models and their responses to identical prompts. This feature is perfect for AI enthusiasts, developers, and researchers looking to evaluate chatbot accuracy, coherence, and efficiency. Understand the strengths and weaknesses of different AI models and make informed choices when selecting the best chatbot for your needs."
  },
  {
    title: "Leaderboard",
    content: "Compete and rise to the top with Deep Arena’s AI-powered leaderboard system. Track your AI interactions, measure your engagement, and earn rankings among other top users. Whether you’re a chatbot trainer, an AI tester, or just an avid user, the leaderboard keeps a record of your performance and achievements. Gain recognition for your expertise, climb the ranks, and challenge yourself to become the best in AI-driven communication and creation."
  }
];

const Blog = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center px-6 md:px-12 py-20" style={{ backgroundColor: colors.background }}>
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-center mb-12" style={{ color: colors.primary }}>
        {t("Deep Arena Blogs")}
      </h1>

      {/* Blog Section */}
      <div className="w-full max-w-4xl space-y-10">
        {blogs.map((blog, index) => (
          <div key={index} className="p-8 rounded-xl bg-gray-800 shadow-lg border-l-8 border-blue-400 transition-all">
            <h3 className="text-3xl font-bold mb-3" style={{ color: colors.primary }}>
              {t(blog.title)}
            </h3>
            <p className="text-lg" style={{ color: colors.textLight }}>
              {t(blog.content)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
