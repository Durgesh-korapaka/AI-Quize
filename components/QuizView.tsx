
import React, { useState } from 'react';
import { Quiz } from '../types';
import QuizCard from './QuizCard';
import { TagIcon, CheckCircleIcon, TrophyIcon } from './Icons';

interface QuizViewProps {
  quizData: Quiz;
}

const QuizView: React.FC<QuizViewProps> = ({ quizData }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex: number, selectedOption: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    quizData.quiz.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);
  };
  
  const resetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  }

  return (
    <div className="space-y-6">
      <header className="p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text mb-2">
          {quizData.title}
        </h2>
        <p className="text-slate-300">{quizData.summary}</p>
      </header>
      
      <div className="space-y-4">
        {quizData.quiz.map((question, index) => (
          <QuizCard
            key={index}
            questionData={question}
            questionIndex={index}
            onAnswerSelect={handleAnswerSelect}
            userAnswer={userAnswers[index]}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        {!isSubmitted ? (
             <button
                onClick={handleSubmit}
                disabled={Object.keys(userAnswers).length !== quizData.quiz.length}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
            >
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                Submit Answers
            </button>
        ) : (
             <div className="w-full text-center p-6 bg-slate-800 rounded-lg shadow-lg border border-indigo-500">
                <div className="flex items-center justify-center gap-4">
                    <TrophyIcon className="w-10 h-10 text-yellow-400"/>
                    <div>
                        <p className="text-xl font-bold text-slate-100">Quiz Complete!</p>
                        <p className="text-2xl font-bold text-green-400">
                            Your Score: {score} / {quizData.quiz.length}
                        </p>
                    </div>
                </div>
                 <button onClick={resetQuiz} className="mt-4 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 transition-colors">
                    Take Again
                </button>
            </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 flex items-center text-slate-300">
          <TagIcon className="w-5 h-5 mr-2 text-cyan-400"/>
          Related Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {quizData.related_topics.map(topic => (
            <span key={topic} className="px-3 py-1 bg-slate-700 text-cyan-300 text-sm font-medium rounded-full">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
