import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGroq } from '../../hooks/useGroq'; // Update the import path

const PolicyThesis = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [displayError, setDisplayError] = useState(null);
  const { fetchGroqResponse, response, loading, error } = useGroq();

  const colors = {
    primary: '#3B82F6',
    secondary: '#1F2937',
    background: '#F9FAFB',
    cardBg: '#FFFFFF'
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
          thesisStatement: sections[0] || `This thesis examines policy reform in ${prompt}, emphasizing equitable implementation.`,
          policyBackground: sections[1] || `The issue of ${prompt} has long posed challenges in governance.`,
          stakeholders: sections[2]?.split('\n') || [
            'Government agencies',
            'Non-governmental organizations',
            'Affected communities',
            'International bodies'
          ],
          objectives: sections[3]?.split('\n') || [
            'Assess current policy efficacy and gaps',
            'Propose inclusive, evidence-based reforms',
            'Promote stakeholder engagement'
          ],
          policyRecommendations: sections[4]?.split('\n') || [
            'Establish a task force to reassess frameworks',
            'Implement pilot programs for validation',
            'Ensure transparent reporting'
          ]
        });
      }
    }
  }, [response, prompt]);

  const generatePolicyThesis = async () => {
    if (!prompt.trim()) {
      setDisplayError('Please enter a policy issue');
      return;
    }
    
    const taskType = `Generate a comprehensive policy thesis framework about: "${prompt}".
      Structure it with these 5 components:
      1. Thesis statement (clear policy focus)
      2. Policy background (1 paragraph)
      3. Key stakeholders (4 bullet points)
      4. Policy objectives (3 bullet points)
      5. Policy recommendations (3 bullet points)
      
      Format the response with each component separated by two newlines.
      Use markdown-style bullet points for lists.
      Focus on evidence-based, actionable policy solutions.`;
    
    await fetchGroqResponse(taskType, prompt);
  };

  const resetThesis = () => {
    setResult(null);
    setPrompt('');
    setDisplayError(null);
  };

  return (
    <div className="min-h-screen text-black mt-24 py-12 px-6" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto space-y-10">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold" style={{ color: colors.secondary }}>
            {t('Policy Thesis Generator')}
          </h1>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
            {t('Build policy-oriented thesis frameworks with stakeholder insights and actionable reform strategies')}
          </p>
        </motion.div>

        {/* Input Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              className="bg-white text-black p-6 rounded-xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-3" style={{ color: colors.secondary }}>
                {t('Enter Policy Issue')}
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t('Example: Affordable housing in urban centers')}
                className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-4 py-3 text-white rounded-lg font-semibold"
                style={{ backgroundColor: colors.primary }}
                onClick={generatePolicyThesis}
                disabled={loading || !prompt.trim()}
              >
                {loading ? t('Generating...') : t('Generate Policy Thesis')}
              </motion.button>
            </motion.div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full bg-white p-10 rounded-xl shadow border">
                <div className="animate-spin h-10 w-10 border-4 border-blue-300 border-t-transparent rounded-full mb-4" />
                <p className="text-gray-600">{t('Analyzing issue and preparing policy framework...')}</p>
              </div>
            ) : result ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-xl shadow-md border space-y-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold" style={{ color: colors.secondary }}>
                    {t('Generated Framework')}
                  </h2>
                  <button
                    className="text-sm px-4 py-2 rounded-lg"
                    style={{ backgroundColor: colors.cardBg, color: colors.primary }}
                    onClick={resetThesis}
                  >
                    {t('Start Over')}
                  </button>
                </div>

                <div className="space-y-5">
                  <section>
                    <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Thesis Statement')}</h3>
                    <p className="mt-2 p-4 rounded-lg bg-gray-100">{result.thesisStatement}</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Policy Background')}</h3>
                    <p className="mt-2 p-4 rounded-lg bg-gray-100">{result.policyBackground}</p>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Stakeholders')}</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                      {result.stakeholders.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Policy Objectives')}</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                      {result.objectives.map((o, i) => (
                        <li key={i}>{o}</li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Recommendations')}</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                      {result.policyRecommendations.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-600 p-8 bg-white rounded-xl shadow border">
                <p>{t('Enter a policy topic to begin generating a structured thesis framework')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyThesis;