import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGroq } from '../../hooks/useGroq'; // Update the import path

const ThesisEnhancer = () => {
  const { t } = useTranslation();
  const [inputThesis, setInputThesis] = useState('');
  const [enhancedThesis, setEnhancedThesis] = useState('');
  const [displayError, setDisplayError] = useState(null);
  const { fetchGroqResponse, response, loading, error } = useGroq();

  useEffect(() => {
    if (error) {
      setDisplayError(error);
      const timer = setTimeout(() => setDisplayError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (response) {
      setEnhancedThesis(response);
    }
  }, [response]);

  const handleEnhance = async () => {
    if (!inputThesis.trim()) {
      setDisplayError('Please enter a thesis statement to enhance');
      return;
    }
    
    const taskType = `Enhance this thesis statement for academic writing: "${inputThesis}".
      - Maintain the original meaning while improving clarity and academic tone
      - Strengthen the argument if possible
      - Keep it concise (1-2 sentences)
      - Format as a direct enhanced version (no commentary or explanation)
      
      Return only the enhanced thesis statement, without any additional text or formatting.`;
    
    await fetchGroqResponse(taskType, inputThesis);
  };

  const resetEnhancer = () => {
    setInputThesis('');
    setEnhancedThesis('');
    setDisplayError(null);
  };

  return (
    <div className="min-h-screen py-12 mt-24 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Error Display */}
        {displayError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded"
            role="alert"
          >
            <p>{displayError}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800">{t('Thesis Enhancer')}</h1>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">{t('Polish your thesis for clarity, strength, and academic tone.')}</p>
        </motion.div>

        <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
          <textarea
            value={inputThesis}
            onChange={(e) => setInputThesis(e.target.value)}
            placeholder={t('Enter your rough thesis here...')}
            className="w-full h-36 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-gray-800"
          />

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleEnhance}
              disabled={!inputThesis.trim() || loading}
              className="flex-1 py-3 bg-purple-600 text-white font-semibold rounded-lg transition"
            >
              {loading ? t('Enhancing...') : t('Enhance Thesis')}
            </motion.button>

            {enhancedThesis && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={resetEnhancer}
                className="px-4 py-3 border border-purple-600 text-purple-600 font-semibold rounded-lg transition"
              >
                {t('Reset')}
              </motion.button>
            )}
          </div>

          {enhancedThesis && (
            <motion.div
              className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-md space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold text-purple-800">{t('Enhanced Thesis')}</h2>
              <p className="text-gray-800">{enhancedThesis}</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThesisEnhancer;