import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGroq } from '../../hooks/useGroq'; // Update the import path

const LiteraturePolicyThesis = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState(null);
  const [displayError, setDisplayError] = useState(null);
  const { fetchGroqResponse, response, loading, error } = useGroq();

  const colors = {
    primary: '#8B5CF6',
    background: '#F3F4F6',
    card: '#FFFFFF',
    text: '#1E293B',
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
          thesisStatement: sections[0] || `Drawing upon literary narratives surrounding ${prompt}, this thesis explores cultural representations and policy implications.`,
          literaryContext: sections[1] || `Through examination of texts addressing ${prompt}, patterns of social discourse and structural challenges emerge.`,
          policyImplications: sections[2]?.split('\n') || [
            'Encourage policy frameworks that acknowledge narratives.',
            'Develop culturally responsive programs.',
            'Utilize literature for civic engagement.'
          ],
          suggestedAuthors: sections[3]?.split('\n') || ['Toni Morrison', 'Chinua Achebe', 'Margaret Atwood', 'James Baldwin'],
          interdisciplinaryFocus: sections[4]?.split('\n') || ['Literary Studies', 'Public Policy', 'Cultural Studies', 'Ethics']
        });
      }
    }
  }, [response, prompt]);

  const generateThesis = async () => {
    if (!prompt.trim()) {
      setDisplayError('Please enter a literary theme or social issue');
      return;
    }
    
    const taskType = `Generate a literature-based policy thesis framework about: "${prompt}".
      Structure it with these 5 components:
      1. Thesis statement (connecting literature to policy)
      2. Literary context (1 paragraph analysis)
      3. Policy implications (3 bullet points)
      4. Relevant authors (4 authors, comma separated)
      5. Interdisciplinary connections (4 fields, comma separated)
      
      Format the response with each component separated by two newlines.
      Use markdown-style bullet points for lists.
      Focus on concrete policy recommendations derived from literary analysis.`;
    
    await fetchGroqResponse(taskType, prompt);
  };

  const resetThesis = () => {
    setResult(null);
    setPrompt('');
    setDisplayError(null);
  };

  return (
    <div className="min-h-screen mt-24 text-black px-6 py-12" style={{ backgroundColor: colors.background }}>
      <div className="max-w-6xl mx-auto space-y-12">
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
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold" style={{ color: colors.text }}>
            {t('Literature-Based Policy Thesis Generator')}
          </h1>
          <p className="text-lg mt-2 text-gray-600 max-w-xl mx-auto">
            {t('Connect literature and narrative analysis to real-world policy solutions and reform ideas.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Input Column */}
          <motion.div
            className="bg-white text-black p-6 rounded-xl shadow border border-gray-200 space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold" style={{ color: colors.text }}>
              {t('Enter Theme or Social Issue')}
            </h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t('Example: Gender inequality in postcolonial literature')}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 text-white rounded-lg font-semibold"
              style={{ backgroundColor: colors.primary }}
              onClick={generateThesis}
              disabled={loading || !prompt.trim()}
            >
              {loading ? t('Generating...') : t('Generate Thesis')}
            </motion.button>
          </motion.div>

          {/* Output Column */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full bg-white p-10 rounded-xl shadow border">
                <div className="animate-spin h-10 w-10 border-4 border-purple-300 border-t-transparent rounded-full mb-4" />
                <p className="text-gray-600">{t('Analyzing texts and deriving policy insights...')}</p>
              </div>
            ) : result ? (
              <motion.div
                className="bg-white p-8 rounded-xl shadow border space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                    {t('Generated Thesis Framework')}
                  </h2>
                  <button
                    className="text-sm px-4 py-2 rounded-lg border"
                    onClick={resetThesis}
                    style={{ borderColor: colors.primary, color: colors.primary }}
                  >
                    {t('Start Over')}
                  </button>
                </div>

                <section>
                  <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Thesis Statement')}</h3>
                  <p className="mt-2 p-4 rounded-lg bg-gray-100">{result.thesisStatement}</p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Literary Context')}</h3>
                  <p className="mt-2 p-4 rounded-lg bg-gray-100">{result.literaryContext}</p>
                </section>

                <section>
                  <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Policy Implications')}</h3>
                  <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
                    {result.policyImplications.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Relevant Authors')}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.suggestedAuthors.map((author, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800"
                      >
                        {author}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-semibold text-lg" style={{ color: colors.primary }}>{t('Interdisciplinary Connections')}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {result.interdisciplinaryFocus.map((field, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-800"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </section>
              </motion.div>
            ) : (
              <div className="text-center text-gray-600 p-8 bg-white rounded-xl shadow border">
                <p>{t('Enter a literary topic or social issue to begin.')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiteraturePolicyThesis;