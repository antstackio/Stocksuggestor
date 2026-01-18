interface BiasScoreIndicatorProps {
  score: number;
  isBullish?: boolean;
}

export function BiasScoreIndicator({
  score,
  isBullish = true,
}: BiasScoreIndicatorProps) {
  const colorClass = isBullish ? "text-green-600" : "text-red-600";
  const bgClass = isBullish ? "bg-green-100" : "bg-red-100";

  return (
    <div
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full ${bgClass} ${colorClass} font-bold text-sm`}
    >
      {score.toFixed(2)}
    </div>
  );
}
