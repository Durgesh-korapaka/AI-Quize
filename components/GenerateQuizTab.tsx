
import React, { useState } from 'react';
import { Quiz } from '../types';
import { generateQuizFromUrl } from '../services/geminiService';
import QuizView from './QuizView';
import { LinkIcon, SparklesIcon } from './Icons';

const GenerateQuizTab: React.FC = () => {
  const [url, setUrl] = useState<string>('https://en.wikipedia.org/wiki/Alan_Turing');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !url.includes('wikipedia.org')) {
      setError('Please enter a valid Wikipedia URL.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setQuiz(null);
    try {
      const result = await generateQuizFromUrl(url);
      setQuiz(result);
    } catch (err) {
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-8 bg-slate-700 rounded-md w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
      </div>
      <div className="space-y-4 pt-4">
        {[...Array(3)].map((_, i) => (
           <div key={i} className="bg-slate-800 p-4 rounded-lg">
             <div className="h-5 bg-slate-700 rounded w-full mb-4"></div>
             <div className="space-y-2">
               <div className="h-4 bg-slate-700 rounded w-1/2"></div>
               <div className="h-4 bg-slate-700 rounded w-1/2"></div>
               <div className="h-4 bg-slate-700 rounded w-1/2"></div>
               <div className="h-4 bg-slate-700 rounded w-1/2"></div>
             </div>
           </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8">
        <label htmlFor="url-input" className="block text-sm font-medium text-slate-300 mb-2">
          Enter Wikipedia Article URL
        </label>
        <div className="relative">
           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-slate-400" />
            </div>
          <input
            id="url-input"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://en.wikipedia.org/wiki/..."
            className="w-full pl-10 pr-32 py-3 bg-slate-700 text-slate-100 border border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
            disabled={isLoading}
          />
           <button
            type="submit"
            disabled={isLoading}
            className="absolute inset-y-0 right-0 m-1.5 flex items-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
             <SparklesIcon className="w-5 h-5 mr-2" />
            {isLoading ? 'Generating...' : 'Generate'}
          </button>
        </div>
        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      </form>

      {isLoading && <LoadingSkeleton />}
      {quiz && <QuizView quizData={quiz} />}
    </div>
  );
};

export default GenerateQuizTab;
