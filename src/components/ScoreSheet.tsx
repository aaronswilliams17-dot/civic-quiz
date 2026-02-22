import { CheckCircle2, XCircle, BookOpen, ExternalLink } from "lucide-react";

interface QuestionResult {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  correct: boolean;
}

interface ScoreSheetProps {
  results: QuestionResult[];
  onRestart: () => void;
}

const resources = [
  { name: "National Archives — Founding Documents", url: "https://www.archives.gov/founding-docs" },
  { name: "USCIS Civics Practice Test", url: "https://my.uscis.gov/prep/test/civics" },
  { name: "Constitution Annotated (Congress.gov)", url: "https://constitution.congress.gov/" },
  { name: "Ben's Guide to the U.S. Government", url: "https://bensguide.gpo.gov/" },
];

const ScoreSheet = ({ results, onRestart }: ScoreSheetProps) => {
  const totalCorrect = results.filter((r) => r.correct).length;
  const total = results.length;
  const percentage = Math.round((totalCorrect / total) * 100);

  // Category breakdown
  const categories = results.reduce<Record<string, { correct: number; total: number }>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = { correct: 0, total: 0 };
    acc[r.category].total++;
    if (r.correct) acc[r.category].correct++;
    return acc;
  }, {});

  const weakCategories = Object.entries(categories)
    .filter(([, v]) => v.correct / v.total < 0.5)
    .map(([k]) => k);

  let message = "";
  if (percentage === 100) message = "Perfect score! You're a true patriot scholar! 🎉";
  else if (percentage >= 80) message = "Excellent work! The Founders would be proud! 🌟";
  else if (percentage >= 60) message = "Good effort! A bit more study and you'll ace it! 📚";
  else message = "Keep learning! Every great citizen starts somewhere. 💪";

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Score Circle */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full border-4 border-primary bg-primary/10 mb-4">
          <div>
            <div className="text-4xl font-bold text-primary">{totalCorrect}</div>
            <div className="text-sm text-muted-foreground">of {total}</div>
          </div>
        </div>
        <p className="text-xl font-bold text-foreground">{message}</p>
      </div>

      {/* Category Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <BookOpen size={20} className="text-primary" />
          Strengths & Weaknesses
        </h3>
        <div className="space-y-3">
          {Object.entries(categories).map(([cat, data]) => {
            const catPct = Math.round((data.correct / data.total) * 100);
            const isWeak = data.correct / data.total < 0.5;
            return (
              <div key={cat} className="p-3 bg-card border border-border rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-foreground">{cat}</span>
                  <span className={`text-sm font-bold ${isWeak ? "text-destructive" : "text-correct"}`}>
                    {data.correct}/{data.total} ({catPct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isWeak ? "bg-destructive" : "bg-correct"}`}
                    style={{ width: `${catPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Review */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4">Question Review</h3>
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={r.id} className="flex items-start gap-3 p-3 bg-card border border-border rounded-lg">
              {r.correct ? (
                <CheckCircle2 className="text-correct shrink-0 mt-0.5" size={18} />
              ) : (
                <XCircle className="text-destructive shrink-0 mt-0.5" size={18} />
              )}
              <div>
                <span className="text-sm text-foreground">
                  {i + 1}. {r.question}
                </span>
                <span className="text-xs text-muted-foreground ml-2">({r.difficulty})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Resources */}
      {weakCategories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-bold text-foreground mb-2">
            📖 Suggested Study Areas
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Focus on: <strong>{weakCategories.join(", ")}</strong>
          </p>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-bold text-foreground mb-4">📚 Learning Resources</h3>
        <div className="space-y-2">
          {resources.map((res) => (
            <a
              key={res.url}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-primary text-sm"
            >
              <ExternalLink size={14} className="shrink-0" />
              {res.name}
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors active:scale-[0.98]"
      >
        Take the Quiz Again
      </button>
    </div>
  );
};

export default ScoreSheet;
