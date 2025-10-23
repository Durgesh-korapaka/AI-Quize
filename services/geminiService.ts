
import { Quiz, PastQuizSummary } from '../types';

// This is a mock service. In a real application, this would use @google/genai
// on a backend server to interact with the Gemini API.

const MOCK_QUIZ_DATA: Quiz = {
  id: 1,
  url: "https://en.wikipedia.org/wiki/Alan_Turing",
  title: "Alan Turing",
  summary: "Alan Mathison Turing OBE FRS was an English mathematician, computer scientist, logician, cryptanalyst, philosopher, and theoretical biologist. Turing was highly influential in the development of theoretical computer science, providing a formalisation of the concepts of algorithm and computation with the Turing machine, which can be considered a model of a general-purpose computer.",
  quiz: [
    {
      question: "In which field did Alan Turing provide a formalisation of the concepts of algorithm and computation?",
      options: [
        "Theoretical Physics",
        "Theoretical Computer Science",
        "Quantum Mechanics",
        "Organic Chemistry"
      ],
      answer: "Theoretical Computer Science",
      difficulty: "easy",
      explanation: "Turing was highly influential in the development of theoretical computer science, introducing the Turing machine."
    },
    {
      question: "What was Alan Turing's primary role at Bletchley Park during World War II?",
      options: [
        "Chief of Operations",
        "Leading Cryptanalyst",
        "Field Agent",
        "Logistics Officer"
      ],
      answer: "Leading Cryptanalyst",
      difficulty: "medium",
      explanation: "During the Second World War, Turing was a leading participant in the breaking of German ciphers at Bletchley Park."
    },
    {
      question: "The 'Turing Test' is a test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a...?",
      options: [
        "Animal",
        "Supercomputer",
        "Human",
        "Alien"
      ],
      answer: "Human",
      difficulty: "easy",
      explanation: "Turing proposed the Turing test as a criterion for machine intelligence, where a machine's ability to exhibit intelligent behavior is evaluated."
    },
    {
      question: "Turing's work on the Automatic Computing Engine (ACE) was a pioneering design for what?",
      options: [
        "A stored-program computer",
        "A mechanical calculator",
        "An artificial neural network",
        "A quantum computer"
      ],
      answer: "A stored-program computer",
      difficulty: "hard",
      explanation: "After the war, Turing designed the Automatic Computing Engine (ACE), one of the first designs for a stored-program computer."
    },
     {
      question: "Which university did Alan Turing attend as an undergraduate?",
      options: [
        "University of Oxford",
        "Imperial College London",
        "University of Manchester",
        "King's College, Cambridge"
      ],
      answer: "King's College, Cambridge",
      difficulty: "medium",
      explanation: "Turing studied mathematics at King's College, Cambridge, from 1931 to 1934."
    }
  ],
  related_topics: ["Cryptography", "Enigma machine", "Turing Test", "Computer Science History", "Bletchley Park"]
};

const MOCK_PAST_QUIZZES: PastQuizSummary[] = [
    { id: 1, url: "https://en.wikipedia.org/wiki/Alan_Turing", title: "Alan Turing" },
    { id: 2, url: "https://en.wikipedia.org/wiki/Marie_Curie", title: "Marie Curie" },
    { id: 3, url: "https://en.wikipedia.org/wiki/Artificial_intelligence", title: "Artificial intelligence" },
    { id: 4, url: "https://en.wikipedia.org/wiki/React_(software)", title: "React (software)" },
];

export const generateQuizFromUrl = (url: string): Promise<Quiz> => {
    console.log(`Generating quiz for URL: ${url}`);
    // Simulate API call to a backend that uses Gemini
    return new Promise((resolve) => {
        setTimeout(() => {
            const newQuiz = { ...MOCK_QUIZ_DATA, url, id: Date.now() };
            if (url.toLowerCase().includes('marie_curie')) {
                newQuiz.title = "Marie Curie";
                newQuiz.quiz[0].question = "What two Nobel Prizes was Marie Curie awarded?";
                newQuiz.quiz[0].options = ["Physics and Chemistry", "Chemistry and Medicine", "Physics and Peace", "Medicine and Literature"];
                newQuiz.quiz[0].answer = "Physics and Chemistry";
            }
            resolve(newQuiz);
        }, 2500);
    });
};

export const getPastQuizzes = (): Promise<PastQuizSummary[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_PAST_QUIZZES);
        }, 1000);
    });
};

export const getQuizDetails = (id: number): Promise<Quiz> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            const quizSummary = MOCK_PAST_QUIZZES.find(q => q.id === id);
            if (quizSummary) {
                const fullQuiz = { ...MOCK_QUIZ_DATA, ...quizSummary };
                 if (quizSummary.title.toLowerCase().includes('marie curie')) {
                    fullQuiz.quiz[0].question = "What two Nobel Prizes was Marie Curie awarded?";
                    fullQuiz.quiz[0].options = ["Physics and Chemistry", "Chemistry and Medicine", "Physics and Peace", "Medicine and Literature"];
                    fullQuiz.quiz[0].answer = "Physics and Chemistry";
                }
                resolve(fullQuiz);
            } else {
                 resolve(MOCK_QUIZ_DATA);
            }
        }, 500);
    });
};
