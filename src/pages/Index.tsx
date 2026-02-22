import { useState, useEffect } from "react";
import parchmentBg from "@/assets/parchment-bg.jpg";
import questions from "@/data/questions.json";
import ProgressBar from "@/components/ProgressBar";
import QuizCard from "@/components/QuizCard";
import ScoreSheet from "@/components/ScoreSheet";
import { ScrollText } from "lucide-react";

const STORAGE_KEY = "civics-quiz-progress";

interface QuizState {
  currentIndex: number;
  results: { id: number; category: string; difficulty: string; question: string; correct: boolean }[];
  completed: boolean;
}

function loadState(): QuizState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { currentIndex: 0, results: [], completed: false };
}

function saveState(state: QuizState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const Index = () => {
  const [state, setState] = useState<QuizState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleAnswer = (correct: boolean) => {
    const q = questions[state.currentIndex];
    const newResults = [...state.results, { id: q.id, category: q.category, difficulty: q.difficulty, question: q.question, correct }];
    const nextIndex = state.currentIndex + 1;
    const completed = nextIndex >= questions.length;

    setState({ currentIndex: nextIndex, results: newResults, completed });
  };

  const handleRestart = () => {
    setState({ currentIndex: 0, results: [], completed: false });
  };

  return (
    <div
      className="min-h-screen bg-background"
      style={{ backgroundImage: `url(${parchmentBg})`, backgroundSize: "cover", backgroundAttachment: "fixed" }}
    >
      <div className="min-h-screen bg-background/60 backdrop-blur-[1px]">
        <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ScrollText className="text-primary" size={28} />
              <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
                We the People
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Daily U.S. Civics &amp; Constitution Quiz
            </p>
          </div>

          <ProgressBar current={state.completed ? questions.length : state.currentIndex} total={questions.length} />

          {!state.completed ? (
            <QuizCard question={questions[state.currentIndex]} onAnswer={handleAnswer} />
          ) : (
            <ScoreSheet results={state.results} onRestart={handleRestart} />
          )}

          <footer className="mt-12 text-center text-xs text-muted-foreground pb-6">
            Sources: National Archives Founding Documents &amp; USCIS Civics Test
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Index;
