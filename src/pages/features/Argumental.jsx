import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGroq } from '../../hooks/useGroq'; // Update the import path

const ArgumentativeThesis = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('guide');
  const [displayError, setDisplayError] = useState(null);
  const { fetchGroqResponse, response, loading, error } = useGroq();

  const colors = {
    primary: '#E74C3C',
    secondary: '#2C3E50',
    background: '#FFFFFF',
    cardBg: '#F8F9FA'
  };

  useEffect(() => {
    if (error) {
      setDisplayError(error);
      const timer = setTimeout(() => setDisplayError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (response) {
      try {
        // Try to parse as JSON first
        const parsedResponse = JSON.parse(response);
        setResult(parsedResponse);
      } catch (e) {
        // If not JSON, format as a simple response
        const parts = response.split('\n\n');
        setResult({
          thesis: parts[0] || `Despite its benefits, ${prompt} poses significant risks that require consideration.`,
          claim: parts[1] || `The practice of ${prompt} has led to several concerning developments.`,
          counterargument: parts[2] || `Proponents argue that ${prompt} provides important benefits.`,
          rebuttal: parts[3] || `However, these advantages come with significant drawbacks.`,
          conclusion: parts[4] || `Therefore, a balanced approach to ${prompt} is necessary.`
        });
      }
    }
  }, [response, prompt]);

  const generateArgument = async () => {
    if (!prompt.trim()) {
      setDisplayError('Please enter a debate topic');
      return;
    }
    
    const taskType = `Generate a complete argumentative thesis about: "${prompt}". 
      Structure it with these 5 components as separate paragraphs:
      1. Thesis statement (clear position on the issue)
      2. Main claim (primary argument)
      3. Counterargument (opposing viewpoint)
      4. Rebuttal (response to counterargument)
      5. Conclusion (final position and call to action)
      
      Format the response with each component separated by two newlines.
      Make the argument balanced but persuasive.`;
    
    await fetchGroqResponse(taskType, prompt);
  };

  const resetArgument = () => {
    setResult(null);
    setPrompt('');
    setDisplayError(null);
  };

  return (
    <div className="min-h-screen py-12 text-black mt-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: colors.secondary }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t('Argumentative Thesis Generator')}
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('Craft compelling argumentative thesis statements with structured reasoning and counterpoints')}
          </motion.p>
        </div>

        {/* Error Display */}
        {displayError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
            role="alert"
          >
            <p>{displayError}</p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input + Guide */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              className="bg-white p-6 text-black rounded-xl shadow-md border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.secondary }}>
                {t('Enter Your Debate Topic')}
              </h2>
              <textarea
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={t('Example: "Facial recognition technology in public spaces"')}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 py-3 px-4 rounded-lg text-white font-semibold shadow-md"
                style={{ backgroundColor: colors.primary }}
                onClick={generateArgument}
                disabled={loading || !prompt.trim()}
              >
                {loading ? t('Generating...') : t('Generate Argument')}
              </motion.button>
            </motion.div>

            {/* Guide/Examples */}
            <motion.div
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'guide' ? 'border-b-2' : 'text-gray-500'}`}
                  style={activeTab === 'guide' ? { borderColor: colors.primary, color: colors.secondary } : {}}
                  onClick={() => setActiveTab('guide')}
                >
                  {t('How to Use')}
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'examples' ? 'border-b-2' : 'text-gray-500'}`}
                  style={activeTab === 'examples' ? { borderColor: colors.primary, color: colors.secondary } : {}}
                  onClick={() => setActiveTab('examples')}
                >
                  {t('Examples')}
                </button>
              </div>

              {activeTab === 'guide' ? (
                <ol className="list-decimal space-y-3 text-gray-700 pl-5">
                  <li>{t('Identify a controversial topic or issue.')}</li>
                  <li>{t('Develop a strong, debatable claim.')}</li>
                  <li>{t('Include at least one counterargument.')}</li>
                  <li>{t('Refute the counterargument with evidence or logic.')}</li>
                  <li>{t('Conclude with a call to action or summary.')}</li>
                </ol>
              ) : (
                <ul className="space-y-3 text-gray-700">
                  <li className="hover:bg-gray-100 p-3 rounded cursor-pointer" onClick={() => setPrompt('Facial recognition in schools')}>
                    "Facial recognition in schools"
                  </li>
                  <li className="hover:bg-gray-100 p-3 rounded cursor-pointer" onClick={() => setPrompt('Banning plastic packaging')}>
                    "Banning plastic packaging"
                  </li>
                  <li className="hover:bg-gray-100 p-3 rounded cursor-pointer" onClick={() => setPrompt('AI in legal decision making')}>
                    "AI in legal decision making"
                  </li>
                </ul>
              )}
            </motion.div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {loading ? (
              <motion.div className="bg-white p-8 rounded-xl shadow-md border flex flex-col items-center justify-center h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: colors.primary }}></div>
                <p className="mt-4 text-lg" style={{ color: colors.secondary }}>
                  {t('Structuring your argument...')}
                </p>
              </motion.div>
            ) : result ? (
              <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-200" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold" style={{ color: colors.secondary }}>
                    {t('Argument Thesis')}
                  </h2>
                  <button 
                    className="text-sm px-4 py-2 rounded-lg" 
                    style={{ backgroundColor: colors.cardBg, color: colors.primary }} 
                    onClick={resetArgument}
                  >
                    {t('New Argument')}
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>🧭 {t('Thesis Statement')}</h3>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>{result.thesis}</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>📌 {t('Main Claim')}</h3>
                    <p>{result.claim}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>🆚 {t('Counterargument')}</h3>
                    <p>{result.counterargument}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>🔁 {t('Rebuttal')}</h3>
                    <p>{result.rebuttal}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary }}>✅ {t('Conclusion')}</h3>
                    <p>{result.conclusion}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div className="bg-white p-8 rounded-xl shadow-md border text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-5xl mb-4" style={{ color: colors.primary }}>💬</div>
                <h3 className="text-xl font-medium mb-2" style={{ color: colors.secondary }}>
                  {t('No Thesis Generated Yet')}
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  {t('Input your debate topic and click "Generate Argument" to begin crafting your argumentative thesis.')}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArgumentativeThesis;