
import React, { useState, useEffect } from 'react';
import { PastQuizSummary, Quiz } from '../types';
import { getPastQuizzes, getQuizDetails } from '../services/geminiService';
import Modal from './Modal';
import QuizView from './QuizView';

const PastQuizzesTab: React.FC = () => {
  const [pastQuizzes, setPastQuizzes] = useState<PastQuizSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      try {
        const quizzes = await getPastQuizzes();
        setPastQuizzes(quizzes);
      } catch (error) {
        console.error("Failed to fetch past quizzes", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDetailsClick = async (id: number) => {
    const quizDetails = await getQuizDetails(id);
    setSelectedQuiz(quizDetails);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
  };
  
  if (isLoading) {
    return (
        <div className="space-y-3 animate-pulse">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-800 rounded-lg flex items-center px-4">
                    <div className="h-5 bg-slate-700 rounded w-3/4"></div>
                </div>
            ))}
        </div>
    );
  }

  return (
    <div className="space-y-3">
        {pastQuizzes.length === 0 ? (
            <p className="text-center text-slate-400">No past quizzes found.</p>
        ) : (
            pastQuizzes.map((quiz) => (
                <div key={quiz.id} className="bg-slate-800 p-4 rounded-lg shadow-md flex justify-between items-center transition-transform hover:scale-[1.02]">
                    <div>
                        <h3 className="font-semibold text-indigo-400">{quiz.title}</h3>
                        <a href={quiz.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-indigo-300 truncate max-w-xs sm:max-w-md">
                            {quiz.url}
                        </a>
                    </div>
                    <button
                        onClick={() => handleDetailsClick(quiz.id)}
                        className="px-4 py-2 bg-slate-700 text-slate-200 font-semibold rounded-md hover:bg-slate-600 transition-colors"
                    >
                        Details
                    </button>
                </div>
            ))
        )}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            {selectedQuiz ? <QuizView quizData={selectedQuiz} /> : <p>Loading quiz details...</p>}
        </Modal>
    </div>
  );
};

export default PastQuizzesTab;
