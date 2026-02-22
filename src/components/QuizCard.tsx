import { useState } from "react";
import { CheckCircle2, XCircle, ChevronDown, ChevronUp, Lightbulb, Star } from "lucide-react";

interface Question {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  choices: string[];
  correctIndex: number;
  hint: string;
  funFact: string;
  source: string;
}

interface QuizCardProps {
  question: Question;
  onAnswer: (correct: boolean) => void;
}

const ROMAN = ["I", "II", "III", "IV"];

const difficultyColor: Record<string, string> = {
  easy: "text-correct",
  medium: "text-accent-foreground",
  hard: "text-destructive",
};

const QuizCard = ({ question, onAnswer }: QuizCardProps) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showFunFact, setShowFunFact] = useState(false);

  const answered = selected !== null;
  const isCorrect = selected === question.correctIndex;

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    if (index === question.correctIndex) {
      setShowFunFact(true);
    }
  };

  const handleNext = () => {
    onAnswer(isCorrect);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Category & Difficulty */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          {question.category}
        </span>
        <span className={`text-xs uppercase tracking-wider font-semibold ${difficultyColor[question.difficulty]}`}>
          {question.difficulty}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 leading-relaxed">
        {question.question}
      </h2>

      {/* Hint */}
      <button
        onClick={() => setShowHint(!showHint)}
        className="flex items-center gap-2 mb-4 text-sm text-primary hover:text-primary/80 transition-colors"
      >
        <Lightbulb size={16} />
        <span>{showHint ? "Hide Hint" : "Show Hint"}</span>
        {showHint ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {showHint && (
        <div className="mb-5 p-3 bg-secondary/60 border border-border rounded-lg text-sm text-muted-foreground italic">
          💡 {question.hint}
        </div>
      )}

      {/* Choices */}
      <div className="space-y-3 mb-6">
        {question.choices.map((choice, i) => {
          let borderClass = "border-border hover:border-primary/50 hover:bg-secondary/50";
          let iconEl = null;

          if (answered) {
            if (i === question.correctIndex) {
              borderClass = "border-correct bg-correct/10";
              iconEl = <CheckCircle2 className="text-correct shrink-0" size={22} />;
            } else if (i === selected) {
              borderClass = "border-destructive bg-destructive/10";
              iconEl = <XCircle className="text-destructive shrink-0" size={22} />;
            } else {
              borderClass = "border-border opacity-50";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all duration-200 ${borderClass} ${!answered ? "cursor-pointer active:scale-[0.98]" : "cursor-default"}`}
            >
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                {ROMAN[i]}
              </span>
              <span className="text-foreground flex-1">{choice}</span>
              {iconEl}
            </button>
          );
        })}
      </div>

      {/* Fun Fact Popup */}
      {showFunFact && (
        <div className="mb-5 p-4 bg-primary/10 border-2 border-primary/30 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-accent" size={18} />
            <span className="font-bold text-primary text-sm uppercase tracking-wide">Fun Fact</span>
          </div>
          <p className="text-sm text-foreground leading-relaxed">{question.funFact}</p>
          <p className="text-xs text-muted-foreground mt-2 italic">Source: {question.source}</p>
        </div>
      )}

      {/* Wrong answer explanation */}
      {answered && !isCorrect && (
        <div className="mb-5 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
          <p className="text-sm text-foreground">
            The correct answer is <strong>{ROMAN[question.correctIndex]}. {question.choices[question.correctIndex]}</strong>
          </p>
          <p className="text-xs text-muted-foreground mt-1 italic">Source: {question.source}</p>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors active:scale-[0.98]"
        >
          Next Question →
        </button>
      )}
    </div>
  );
};

export default QuizCard;
