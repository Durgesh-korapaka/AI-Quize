
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  question: string;
  options: string[];
  answer: string;
  difficulty: Difficulty;
  explanation: string;
}

export interface Quiz {
  id: number;
  url: string;
  title: string;
  summary: string;
  quiz: Question[];
  related_topics: string[];
}

export interface PastQuizSummary {
  id: number;
  url: string;
  title: string;
}
