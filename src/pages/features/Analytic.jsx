import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGroq } from '../../hooks/useGroq'; // Update the import path

const AnalyticalThesis = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [activeTab, setActiveTab] = useState('guide');
  const { fetchGroqResponse, response, loading, error } = useGroq();
  const [result, setResult] = useState(null);
  const [displayError, setDisplayError] = useState(null);

  const colors = {
    primary: '#76B900',
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
        setResult({
          thesisStatement: response,
          keyComponents: [],
          methodology: "Mixed methods approach combining quantitative and qualitative analysis",
          recommendations: [
            'Further research needed to explore this topic in depth',
            'Consider comparative studies with related phenomena',
            'Validate findings with empirical data'
          ]
        });
      }
    }
  }, [response]);

  const generateAnalysis = async () => {
    if (!prompt.trim()) {
      setDisplayError('Please enter a research topic');
      return;
    }
    
    const taskType = `Generate an analytical thesis framework about the following topic. 
      Include these sections: 
      1. A clear thesis statement
      2. 3-5 key components to analyze 
      3. Suggested methodology
      4. Research recommendations
      
      Format the response as JSON with these keys:
      {
        "thesisStatement": "",
        "keyComponents": [],
        "methodology": "",
        "recommendations": []
      }`;
    
    await fetchGroqResponse(taskType, prompt);
  };

  const resetAnalysis = () => {
    setResult(null);
    setPrompt('');
    setDisplayError(null);
  };

  return (
    <div className="min-h-screen mt-24 text-black py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
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
            {t('Analytical Thesis Generator')}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('Deconstruct complex topics with AI-powered structural analysis and data interpretation')}
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input and Guide */}
          <div className="lg:col-span-1 space-y-6">
            {/* Input Card */}
            <motion.div 
              className="bg-white p-6 text-black rounded-xl shadow-md border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.secondary }}>
                {t('Enter Your Research Topic')}
              </h2>
              <textarea
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={t('Example: "The impact of social media on political polarization"')}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: colors.primary }}
                className="w-full mt-4 py-3 px-4 rounded-lg text-white font-semibold shadow-md"
                onClick={generateAnalysis}
                disabled={loading || !prompt.trim()}
              >
                {loading ? t('Analyzing...') : t('Generate Thesis Framework')}
              </motion.button>
            </motion.div>

            {/* Guide Card */}
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
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                    {t('Creating Effective Analytical Thesis')}
                  </h3>
                  <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                    <li>{t('Focus on a specific, researchable topic')}</li>
                    <li>{t('Identify key variables or components to analyze')}</li>
                    <li>{t('Consider comparative or contrasting elements')}</li>
                    <li>{t('Formulate clear research questions')}</li>
                    <li>{t('Determine appropriate analytical methods')}</li>
                  </ol>
                  <div className="p-4 mt-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                    <p className="font-medium">{t('Pro Tip:')}</p>
                    <p>{t('Start broad, then narrow your focus based on available data and research gaps')}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                    {t('Example Prompts')}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setPrompt('The correlation between economic inequality and educational attainment')}>
                      "The correlation between economic inequality and educational attainment"
                    </li>
                    <li className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setPrompt('Comparative analysis of renewable energy policies in Europe and Asia')}>
                      "Comparative analysis of renewable energy policies in Europe and Asia"
                    </li>
                    <li className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setPrompt('The impact of algorithmic bias in hiring practices')}>
                      "The impact of algorithmic bias in hiring practices"
                    </li>
                  </ul>
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            {loading ? (
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: colors.primary }}></div>
                <p className="mt-4 text-lg" style={{ color: colors.secondary }}>
                  {t('Analyzing your topic and generating framework...')}
                </p>
              </motion.div>
            ) : result ? (
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold" style={{ color: colors.secondary }}>
                    {t('Analysis Results')}
                  </h2>
                  <button 
                    className="text-sm px-4 py-2 rounded-lg" 
                    style={{ backgroundColor: colors.cardBg, color: colors.primary }}
                    onClick={resetAnalysis}
                  >
                    {t('New Analysis')}
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Thesis Statement */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">📝</span> {t('Thesis Statement')}
                    </h3>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                      <p>{result.thesisStatement}</p>
                    </div>
                  </div>

                  {/* Key Components */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">🔍</span> {t('Key Components')}
                    </h3>
                    <ul className="space-y-3">
                      {result.keyComponents.map((component, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2" style={{ color: colors.primary }}>•</span>
                          <span>{component}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Methodology */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">🛠️</span> {t('Suggested Methodology')}
                    </h3>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                      <p>{result.methodology}</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">💡</span> {t('Research Recommendations')}
                    </h3>
                    <ul className="space-y-3">
                      {result.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2" style={{ color: colors.primary }}>•</span>
                          <span>{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 rounded-lg font-medium shadow-sm"
                      style={{ backgroundColor: colors.primary, color: 'white' }}
                    >
                      {t('Save Framework')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 rounded-lg font-medium shadow-sm border"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      {t('Export to Word')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 rounded-lg font-medium shadow-sm border"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      {t('Generate Literature Review')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center h-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-5xl mb-4" style={{ color: colors.primary }}>📊</div>
                <h3 className="text-xl font-medium mb-2" style={{ color: colors.secondary }}>
                  {t('No Analysis Generated Yet')}
                </h3>
                <p className="text-gray-600 max-w-md">
                  {t('Enter your research topic and click "Generate Thesis Framework" to get started with your analytical thesis')}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticalThesis;