import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DirectionBadgeProps {
  direction: "Bullish" | "Bearish";
}

export function DirectionBadge({ direction }: DirectionBadgeProps) {
  const isBullish = direction === "Bullish";

  return (
    <Badge
      variant={isBullish ? "default" : "destructive"}
      className={
        isBullish
          ? "bg-green-500 hover:bg-green-600 flex items-center gap-1"
          : "bg-red-500 hover:bg-red-600 flex items-center gap-1"
      }
    >
      {isBullish ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {direction}
    </Badge>
  );
}
