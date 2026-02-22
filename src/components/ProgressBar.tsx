interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">
          Question {Math.min(current + 1, total)} of {total}
        </span>
        <span className="text-sm font-semibold text-primary">
          {percentage}% Complete
        </span>
      </div>
      <div className="w-full h-3 bg-secondary rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
