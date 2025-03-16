import React, { useState } from 'react';
import { getCodeSuggestion } from '../services/geminiService';

const CodeSuggestionComponent = ({ onApplySuggestion, mode }) => {
  const [prompt, setPrompt] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetSuggestion = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await getCodeSuggestion(prompt);
      setSuggestion(result);
    } catch (err) {
      setError('Failed to get suggestion. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplySuggestion = () => {
    if (suggestion) {
      onApplySuggestion(suggestion);
    }
  };

  return (
    <div className={`w-full mx-auto shadow-md transition-colors duration-200 ${mode === 'dark' ? 'shadow-gray-800 bg-gray-900' : 'shadow-gray-200 bg-white'} p-6 rounded-lg`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-lg font-semibold ${mode === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>
          AI Code Suggestions
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the component you want to create..."
          className={`flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors ${
            mode === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-800'
          }`}
        />
        <button 
          onClick={handleGetSuggestion}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isLoading 
              ? `${mode === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-500'} cursor-not-allowed` 
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white cursor-pointer shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? 'Loading...' : 'Get Suggestion'}
        </button>
      </div>
      
      {error && (
        <div className={`mb-4 p-3 rounded-lg ${
          mode === 'dark' ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700'
        }`}>
          {error}
        </div>
      )}
      
      {suggestion && (
        <div className="mt-4">
          <div className={`max-h-64 overflow-y-auto rounded-lg p-4 mb-4 font-mono text-sm whitespace-pre-wrap border ${
            mode === 'dark' 
              ? 'bg-gray-800 text-gray-300 border-gray-700' 
              : 'bg-gray-50 text-gray-800 border-gray-200'
          }`}>
            {suggestion}
          </div>
          <button
            onClick={handleApplySuggestion}
            className="px-4 py-2 rounded-lg font-medium transition-all bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-md hover:shadow-lg"
          >
            Apply to Editor
          </button>
        </div>
      )}
    </div>
  );
};

export default CodeSuggestionComponent;