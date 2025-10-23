
import React from 'react';
import { Question } from '../types';
import { LightBulbIcon } from './Icons';

interface QuizCardProps {
  questionData: Question;
  questionIndex: number;
  onAnswerSelect: (questionIndex: number, selectedOption: string) => void;
  userAnswer?: string;
  isSubmitted: boolean;
}

const DifficultyBadge: React.FC<{ difficulty: 'easy' | 'medium' | 'hard' }> = ({ difficulty }) => {
  const styles = {
    easy: 'bg-green-500/20 text-green-300 border-green-500/30',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-300 border-red-500/30',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[difficulty]} capitalize`}>
      {difficulty}
    </span>
  );
};

const QuizCard: React.FC<QuizCardProps> = ({
  questionData,
  questionIndex,
  onAnswerSelect,
  userAnswer,
  isSubmitted,
}) => {
  const getOptionClass = (option: string) => {
    if (!isSubmitted) {
      return userAnswer === option
        ? 'bg-indigo-600 border-indigo-500 ring-2 ring-indigo-400'
        : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500';
    }

    const isCorrectAnswer = option === questionData.answer;
    const isSelectedAnswer = option === userAnswer;

    if (isCorrectAnswer) {
      return 'bg-green-500/30 border-green-500 text-green-200';
    }
    if (isSelectedAnswer && !isCorrectAnswer) {
      return 'bg-red-500/30 border-red-500 text-red-200';
    }
    return 'bg-slate-700 border-slate-600 opacity-60';
  };
  
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <p className="text-lg font-semibold text-slate-100 pr-4">
          {questionIndex + 1}. {questionData.question}
        </p>
        <DifficultyBadge difficulty={questionData.difficulty} />
      </div>
      <div className="space-y-3">
        {questionData.options.map((option, i) => (
          <button
            key={i}
            onClick={() => onAnswerSelect(questionIndex, option)}
            disabled={isSubmitted}
            className={`w-full text-left p-4 rounded-lg border transition-all duration-200 text-slate-200 ${getOptionClass(option)}`}
          >
            <span className="font-mono mr-3 text-indigo-300">{String.fromCharCode(65 + i)}.</span>
            {option}
          </button>
        ))}
      </div>
       {isSubmitted && (
         <div className="mt-5 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
           <p className="flex items-center text-sm font-semibold text-yellow-300">
              <LightBulbIcon className="w-5 h-5 mr-2 text-yellow-400" />
              Explanation
           </p>
           <p className="text-slate-300 mt-1 text-sm">{questionData.explanation}</p>
         </div>
       )}
    </div>
  );
};

export default QuizCard;
