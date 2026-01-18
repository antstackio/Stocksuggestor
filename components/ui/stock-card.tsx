"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PriorityBadge } from "./priority-badge";
import { BiasScoreIndicator } from "./bias-score-indicator";
import { Flame, AlertTriangle, Clock } from "lucide-react";
import { Priority } from "@/types/api";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface StockCardProps {
  symbol: string;
  biasScore: number;
  priority: Priority;
  reason: string;
  latestNewsTime: string;
  newsCount?: number;
  isBullish?: boolean;
}

export function StockCard({
  symbol,
  biasScore,
  priority,
  reason,
  latestNewsTime,
  newsCount,
  isBullish = true,
}: StockCardProps) {
  const isHighConviction = isBullish && biasScore > 3;
  const isHighRisk = !isBullish && priority === "HIGH";

  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, HH:mm");
    } catch {
      return dateString;
    }
  };

  return (
    <Card
      className={`transition-all hover:shadow-lg ${
        isBullish
          ? "border-l-4 border-l-green-500"
          : "border-l-4 border-l-red-500"
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">{symbol}</CardTitle>
          <BiasScoreIndicator score={biasScore} isBullish={isBullish} />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <PriorityBadge priority={priority} />
          {isHighConviction && (
            <Badge className="bg-orange-500 hover:bg-orange-600 flex items-center gap-1">
              <Flame className="h-3 w-3" />
              High Conviction
            </Badge>
          )}
          {isHighRisk && (
            <Badge
              variant="destructive"
              className="flex items-center gap-1"
            >
              <AlertTriangle className="h-3 w-3" />
              High Risk
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="reason" className="border-none">
            <AccordionTrigger className="text-sm font-medium hover:no-underline">
              Analysis
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatTime(latestNewsTime)}
          </div>
          {newsCount && (
            <div className="font-medium">{newsCount} news articles</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
