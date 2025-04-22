import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
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
        title: "Smart Literature Review", 
        description: "AI-powered source finding, summarization, and gap analysis",
        icon: "📚",
        details: [
          "Automated source recommendations",
          "Key point extraction",
          "Research gap identification",
          "Citation management"
        ]
      },
      { 
        title: "Methodology Assistant", 
        description: "Guided research design and analysis planning",
        icon: "🛠️",
        details: [
          "Method selection wizard",
          "Sample size calculator",
          "Ethical review checklist",
          "Validation tools"
        ]
      },
      { 
        title: "Writing Enhancer", 
        description: "Real-time academic writing suggestions and edits",
        icon: "✍️",
        details: [
          "Tone adjustment",
          "Academic phrasing",
          "Structure optimization",
          "Plagiarism check"
        ]
      },
      { 
        title: "Collaboration Hub", 
        description: "Team research management and version control",
        icon: "👥",
        details: [
          "Real-time co-authoring",
          "Comment threading",
          "Change tracking",
          "Role-based permissions"
        ]
      }
    ];

  const thesisTypes = [
    { 
      title: "Analytical Thesis", 
      description: "Deconstruct complex topics with AI-powered structural analysis, statistical evaluation, and data interpretation tools. Our system helps identify patterns, relationships, and key insights in your research data.",
      icon: "📊",
      features: [
        "Data pattern recognition",
        "Statistical analysis support",
        "Comparative frameworks",
        "Visualization tools"
      ]
    },
    { 
      title: "Argumentative Thesis", 
      description: "Construct compelling arguments with evidence mapping, counter-argument generation, and logical flow analysis. The AI suggests relevant sources and helps strengthen your rhetorical strategies.",
      icon: "⚖️",
      features: [
        "Evidence organization",
        "Logical fallacy detection",
        "Persuasion scoring",
        "Counter-argument generator"
      ]
    },
    { 
      title: "Historical Thesis", 
      description: "Contextualize events with temporal mapping, primary source analysis, and historiographical comparison tools. Our AI helps identify historical patterns and contextual relationships.",
      icon: "📜",
      features: [
        "Timeline generator",
        "Source credibility analysis",
        "Historiographical comparison",
        "Contextual linking"
      ]
    },
    { 
      title: "Philosophical Thesis", 
      description: "Explore conceptual frameworks with argument deconstruction, philosophical tradition mapping, and thought experiment generation. The AI helps trace philosophical lineages and conceptual developments.",
      icon: "🧠",
      features: [
        "Concept mapping",
        "Philosophical tradition analysis",
        "Argument deconstruction",
        "Thought experiment generator"
      ]
    },
    { 
      title: "Policy-Oriented Thesis", 
      description: "Develop actionable recommendations with stakeholder analysis, policy impact projection, and implementation roadmap tools. Our system evaluates policy alternatives and potential outcomes.",
      icon: "🏛️",
      features: [
        "Stakeholder mapping",
        "Impact forecasting",
        "Cost-benefit analysis",
        "Implementation planning"
      ]
    },
    { 
      title: "Experimental Research", 
      description: "Design and analyze experiments with methodology suggestions, statistical tool selection, and results interpretation guidance. The AI helps optimize your research design.",
      icon: "🔬",
      features: [
        "Methodology wizard",
        "Statistical test recommender",
        "Results interpreter",
        "Visualization tools"
      ]
    }
  ];

  const workflowSteps = [
    {
      title: "Research Design",
      description: "Define your research question and methodology",
      icon: "1",
      content: [
        "Question formulation assistant",
        "Hypothesis generator",
        "Methodology template library",
        "Ethical considerations checklist"
      ]
    },
    {
      title: "Literature Synthesis",
      description: "Gather and analyze existing research",
      icon: "2",
      content: [
        "Automated database searches",
        "Source relevance scoring",
        "Concept mapping tools",
        "Literature gap analysis"
      ]
    },
    {
      title: "Data Collection",
      description: "Gather and organize your research data",
      icon: "3",
      content: [
        "Survey design tools",
        "Interview question bank",
        "Data import wizards",
        "Experimental protocol templates"
      ]
    },
    {
      title: "Analysis & Writing",
      description: "Interpret data and compose your thesis",
      icon: "4",
      content: [
        "Statistical analysis guidance",
        "Results visualization",
        "Chapter structuring",
        "Academic style checker"
      ]
    },
    {
      title: "Review & Submission",
      description: "Finalize and submit your work",
      icon: "5",
      content: [
        "Automated formatting",
        "Plagiarism check",
        "Peer review simulation",
        "Journal matching"
      ]
    }
  ];

  const testimonials = [
    {
      quote: "ThesisAI reduced my literature review time by 60% while improving the quality of my sources.",
      author: "Dr. Sarah Chen, Harvard University",
      role: "Postdoctoral Researcher"
    },
    {
      quote: "The methodology assistant helped me design a more rigorous experimental approach than my original plan.",
      author: "Michael Rodriguez, Stanford",
      role: "PhD Candidate"
    },
    {
      quote: "As a non-native English speaker, the writing enhancer was invaluable for polishing my academic prose.",
      author: "Amina Diallo, Sorbonne University",
      role: "Graduate Student"
    }
  ];

  const pricingPlans = [
    {
      name: "Student",
      price: "$9.99",
      period: "per month",
      features: [
        "Basic thesis support",
        "5 AI-assisted reviews/month",
        "Standard literature search",
        "Email support"
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Researcher",
      price: "$19.99",
      period: "per month",
      features: [
        "Advanced analysis tools",
        "Unlimited AI reviews",
        "Premium literature search",
        "Priority support",
        "Collaboration features"
      ],
      cta: "Most Popular"
    },
    {
      name: "Institution",
      price: "Custom",
      period: "annual license",
      features: [
        "Unlimited users",
        "Admin dashboard",
        "API access",
        "Dedicated account manager",
        "Custom integrations"
      ],
      cta: "Contact Sales"
    }
  ];

  const faqs = [
    {
      question: "How does ThesisAI ensure academic integrity?",
      answer: "We emphasize proper citation and source attribution. Our tools are designed to support original work, not replace it. We include plagiarism checks and encourage critical engagement with all AI suggestions."
    },
    {
      question: "Can ThesisAI format citations automatically?",
      answer: "Yes, we support all major citation styles (APA, MLA, Chicago, etc.) with automatic formatting and bibliography generation. You can also create custom citation formats if needed."
    },
    {
      question: "Is my research data secure?",
      answer: "Absolutely. We use end-to-end encryption and give you complete control over your data. You can choose to store data locally or in our secure cloud with rigorous access controls."
    },
    {
      question: "How does ThesisAI compare to general AI tools?",
      answer: "Unlike general AI, ThesisAI is specifically trained on academic writing and research methodologies. We focus on scholarly rigor rather than general content generation."
    },
    {
      question: "Can I export my work to Word or LaTeX?",
      answer: "Yes, we support export to multiple formats including Word, PDF, LaTeX, and Markdown. You can also set up automatic backups to cloud storage services."
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div style={{ backgroundColor: colors.background }} className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 px-6 flex flex-col items-center text-center" style={{ background: `linear-gradient(135deg, ${colors.background} 0%, #F5F7FA 100%)` }}>
        <motion.h1
          style={{ color: colors.primary }}
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ThesisAI
        </motion.h1>
        
        <motion.p
          style={{ color: colors.secondary }}
          className="text-xl md:text-3xl font-medium mb-10 max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          GenAI for Academics and Researchers
        </motion.p>
        
        <motion.p
          className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Revolutionizing academic research with AI-powered tools for every stage of the thesis process. From literature review to final submission, we've got you covered.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          
          <Link
            to={"/signup"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ backgroundColor: colors.primary, color: colors.textLight }}
            className="px-8 py-4 rounded-lg font-bold text-lg shadow-lg"
          >
            Join ThesisAI
          </Link>
          <Link
            to="/explore"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ border: `2px solid ${colors.primary}`, color: colors.primary }}
            className="px-8 py-4 rounded-lg font-bold text-lg bg-transparent"
          >
            Start Making Thesis
          </Link>
        </div>
        
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <img 
            src="/images/logo.jpg" 
            alt="Academic Research" 
            className="w-full h-auto rounded-xl shadow-xl border border-gray-200"
          />
        </motion.div>
      </section>

      {/* Thesis Types Section */}
      <section className="w-full py-20 px-6 max-w-7xl">
        <motion.h2
          style={{ color: colors.primary }}
          className="text-3xl md:text-5xl font-bold text-center mb-16"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Comprehensive Thesis Support
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {thesisTypes.map((type, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
              whileHover={{ y: -10, boxShadow: `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)` }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{type.icon}</div>
                <h3 style={{ color: colors.secondary }} className="text-2xl font-bold mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span style={{ color: colors.primary }} className="mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span style={{ color: colors.primary }} className="font-semibold">RESEARCH ELEVATED</span>
            <motion.h2
              style={{ color: colors.secondary }}
              className="text-3xl md:text-5xl font-bold mt-4"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Powerful Features for Academic Success
            </motion.h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              {features.slice(0, 2).map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-6" style={{ color: colors.primary }}>{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: colors.secondary }}>{feature.title}</h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span style={{ color: colors.primary }} className="mr-2">•</span>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-8">
              {features.slice(2, 4).map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-6" style={{ color: colors.primary }}>{feature.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: colors.secondary }}>{feature.title}</h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <ul className="space-y-2">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <span style={{ color: colors.primary }} className="mr-2">•</span>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="w-full py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span style={{ color: colors.primary }} className="font-semibold">YOUR RESEARCH JOURNEY</span>
            <motion.h2
              style={{ color: colors.secondary }}
              className="text-3xl md:text-5xl font-bold mt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Streamlined Thesis Workflow
            </motion.h2>
          </motion.div>
          
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-16 lg:space-y-0">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'} mb-8 lg:mb-0`}>
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full">
                      <div className="flex items-center mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl mr-4" style={{ backgroundColor: colors.primary }}>
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold" style={{ color: colors.secondary }}>{step.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.content.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span style={{ color: colors.primary }} className="mr-2">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2 flex justify-center">
                    <div className="relative w-full max-w-md">
                      <img 
                        src={`https://miro.medium.com/v2/resize:fit:1400/1*sxbt-dzMCWBaYvPGA4jxng.jpeg`}
                        alt={step.title}
                        className="rounded-xl shadow-md border border-gray-200 w-full"
                      />
                      <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-lg shadow-md border border-gray-200">
                        <span className="font-medium" style={{ color: colors.primary }}>Step {step.icon}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span style={{ color: colors.primary }} className="font-semibold">TRUSTED BY RESEARCHERS</span>
            <motion.h2
              style={{ color: colors.secondary }}
              className="text-3xl md:text-5xl font-bold mt-4"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              What Academics Are Saying
            </motion.h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md border border-gray-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-4" style={{ color: colors.primary }}>"</div>
                <p className="text-gray-700 text-lg mb-6">{testimonial.quote}</p>
                <div>
                  <p className="font-bold" style={{ color: colors.secondary }}>{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      
      {/* FAQ Section */}
      <section className="w-full py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span style={{ color: colors.primary }} className="font-semibold">HAVE QUESTIONS?</span>
            <motion.h2
              style={{ color: colors.secondary }}
              className="text-3xl md:text-5xl font-bold mt-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-medium" style={{ color: colors.secondary }}>{faq.question}</h3>
                  <span className="ml-4 text-xl" style={{ color: colors.primary }}>
                    {expandedFaq === index ? '−' : '+'}
                  </span>
                </button>
                <motion.div
                  className="overflow-hidden"
                  initial={{ height: 0 }}
                  animate={{ height: expandedFaq === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 pt-2 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-6" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, #5A9C00 100%)` }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Research?
          </motion.h2>
          <motion.p
            className="text-xl text-white mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of researchers who are already accelerating their academic work with ThesisAI.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
            to={"/signup"} 
            className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors">
              Join Now
            </Link>
            <Link
              to={"/login"}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-green-600 transition-colors">
              Login Now 
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;