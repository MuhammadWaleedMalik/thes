import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGroq } from '../../hooks/useGroq'; // Update the import path

const HistoricalThesis = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [geographicFocus, setGeographicFocus] = useState('');
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('guide');
  const [displayError, setDisplayError] = useState(null);
  const { fetchGroqResponse, response, loading, error } = useGroq();

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
        // If not JSON, format as a structured response
        const sections = response.split('\n\n');
        setResult({
          thesisStatement: sections[0] || `This historical analysis examines ${prompt} during ${timePeriod || 'the selected period'} in ${geographicFocus || 'the specified region'}.`,
          historicalContext: sections[1]?.split('\n') || [
            `Background of ${prompt.split(' ')[0]} in ${timePeriod || 'this period'}`,
            `Key events leading to the development of ${prompt}`,
            `Contemporary accounts and primary sources`
          ],
          historiographicalDebate: sections[2]?.split('\n') || [
            'Main scholarly perspectives on this topic',
            'Key historians and their interpretations',
            'Evolution of the historical narrative'
          ],
          researchApproach: sections[3] || `Combination of archival research, textual analysis, and comparative historical methods`,
          potentialSources: sections[4]?.split('\n') || [
            'National archives and collections',
            'Contemporary newspapers and periodicals',
            'Personal correspondence and diaries',
            'Archaeological evidence where applicable'
          ]
        });
      }
    }
  }, [response, prompt, timePeriod, geographicFocus]);

  const generateHistoricalThesis = async () => {
    if (!prompt.trim()) {
      setDisplayError('Please enter a historical topic');
      return;
    }
    
    const taskType = `Generate a comprehensive historical thesis framework about: "${prompt}" during ${timePeriod || 'a historical period'} in ${geographicFocus || 'a specific region'}. 
      Structure it with these 5 components:
      1. Thesis statement (clear historical argument)
      2. Historical context (3 bullet points)
      3. Historiographical debate (3 bullet points)
      4. Research methodology
      5. Potential primary sources (4 bullet points)
      
      Format the response with each component separated by two newlines.
      Use markdown-style bullet points for lists.
      Focus on academic rigor and primary source analysis.`;
    
    await fetchGroqResponse(taskType, prompt);
  };

  const resetResearch = () => {
    setResult(null);
    setPrompt('');
    setTimePeriod('');
    setGeographicFocus('');
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
            {t('Historical Thesis Generator')}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('Contextualize historical events with AI-powered analysis of primary sources and historiographical perspectives')}
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
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.secondary }}>
                {t('Historical Research Parameters')}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Historical Topic/Event')}
                  </label>
                  <textarea
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t('Example: "women\'s suffrage movement"')}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Time Period')}
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t('Example: "early 20th century"')}
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('Geographic Focus')}
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={t('Example: "United States and Britain"')}
                    value={geographicFocus}
                    onChange={(e) => setGeographicFocus(e.target.value)}
                  />
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: colors.primary }}
                className="w-full mt-4 py-3 px-4 rounded-lg text-white font-semibold shadow-md"
                onClick={generateHistoricalThesis}
                disabled={loading || !prompt.trim()}
              >
                {loading ? t('Researching...') : t('Generate Historical Framework')}
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
                  {t('Historical Methods')}
                </button>
                <button
                  className={`py-2 px-4 font-medium ${activeTab === 'examples' ? 'border-b-2' : 'text-gray-500'}`}
                  style={activeTab === 'examples' ? { borderColor: colors.primary, color: colors.secondary } : {}}
                  onClick={() => setActiveTab('examples')}
                >
                  {t('Case Studies')}
                </button>
              </div>

              {activeTab === 'guide' ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                    {t('Crafting Historical Theses')}
                  </h3>
                  <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                    <li>{t('Establish clear temporal and geographic boundaries')}</li>
                    <li>{t('Identify primary sources and archival materials')}</li>
                    <li>{t('Situate within existing historiography')}</li>
                    <li>{t('Consider causation vs. correlation')}</li>
                    <li>{t('Address historical significance and legacy')}</li>
                  </ol>
                  <div className="p-4 mt-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                    <p className="font-medium">{t('Historian\'s Tip:')}</p>
                    <p>{t('Always interrogate your sources for bias and perspective - who created them and why?')}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold" style={{ color: colors.primary }}>
                    {t('Historical Thesis Examples')}
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li 
                      className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setPrompt("impact of the printing press");
                        setTimePeriod("15th-16th centuries");
                        setGeographicFocus("Europe");
                      }}
                    >
                      "The impact of the printing press on knowledge dissemination in 15th-16th century Europe"
                    </li>
                    <li 
                      className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setPrompt("decolonization movements");
                        setTimePeriod("1945-1975");
                        setGeographicFocus("Africa and Asia");
                      }}
                    >
                      "Comparative analysis of decolonization movements in Africa and Asia (1945-1975)"
                    </li>
                    <li 
                      className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setPrompt("women in the industrial workforce");
                        setTimePeriod("World War II");
                        setGeographicFocus("United States and Britain");
                      }}
                    >
                      "Changing roles of women in the industrial workforce during WWII: US vs. Britain"
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
                  {t('Researching historical context and generating framework...')}
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
                    {t('Historical Analysis Framework')}
                  </h2>
                  <button 
                    className="text-sm px-4 py-2 rounded-lg" 
                    style={{ backgroundColor: colors.cardBg, color: colors.primary }}
                    onClick={resetResearch}
                  >
                    {t('New Research')}
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Thesis Statement */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">📜</span> {t('Historical Thesis Statement')}
                    </h3>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                      <p className="italic">{result.thesisStatement}</p>
                    </div>
                  </div>

                  {/* Historical Context */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">⏳</span> {t('Historical Context')}
                    </h3>
                    <ul className="space-y-3">
                      {result.historicalContext.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2" style={{ color: colors.primary }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Historiographical Debate */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">📚</span> {t('Historiographical Debate')}
                    </h3>
                    <ul className="space-y-3">
                      {result.historiographicalDebate.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2" style={{ color: colors.primary }}>•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Research Approach */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">🔎</span> {t('Research Approach')}
                    </h3>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: colors.cardBg }}>
                      <p>{result.researchApproach}</p>
                    </div>
                  </div>

                  {/* Potential Sources */}
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: colors.primary }}>
                      <span className="mr-2">🏛️</span> {t('Potential Primary Sources')}
                    </h3>
                    <ul className="space-y-3">
                      {result.potentialSources.map((source, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2" style={{ color: colors.primary }}>•</span>
                          <span>{source}</span>
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
                      {t('Find Primary Sources')}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 rounded-lg font-medium shadow-sm border"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      {t('Generate Bibliography')}
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
                <div className="text-5xl mb-4" style={{ color: colors.primary }}>🏺</div>
                <h3 className="text-xl font-medium mb-2" style={{ color: colors.secondary }}>
                  {t('No Historical Analysis Yet')}
                </h3>
                <p className="text-gray-600 max-w-md">
                  {t('Enter your historical topic, time period, and geographic focus to generate a research framework')}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalThesis;