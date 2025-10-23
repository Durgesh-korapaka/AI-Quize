
import React, { useState } from 'react';
import GenerateQuizTab from './components/GenerateQuizTab';
import PastQuizzesTab from './components/PastQuizzesTab';
import { BrainCircuitIcon, HistoryIcon } from './components/Icons';

type Tab = 'generate' | 'history';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('generate');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'generate':
        return <GenerateQuizTab />;
      case 'history':
        return <PastQuizzesTab />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{
    tabName: Tab;
    label: string;
    icon: React.ReactNode;
  }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center justify-center w-full px-4 py-3 font-semibold text-sm rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 ${
        activeTab === tabName
          ? 'bg-indigo-600 text-white shadow-md'
          : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
             <BrainCircuitIcon className="h-8 w-8 text-indigo-400" />
            <h1 className="text-2xl font-bold ml-3 bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
              DeepKlarity AI Quiz Generator
            </h1>
          </div>
          <p className="text-slate-400 text-sm">Powered by Gemini</p>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800 p-2 rounded-xl shadow-lg grid grid-cols-2 gap-2 mb-8">
            <TabButton tabName="generate" label="Generate Quiz" icon={<BrainCircuitIcon className="w-5 h-5" />} />
            <TabButton tabName="history" label="Past Quizzes" icon={<HistoryIcon className="w-5 h-5" />} />
          </div>

          <div className="transition-opacity duration-300">
            {renderTabContent()}
          </div>
        </div>
      </main>

      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DeepKlarity Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
