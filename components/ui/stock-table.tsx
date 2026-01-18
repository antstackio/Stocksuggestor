"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PriorityBadge } from "./priority-badge";
import { DirectionBadge } from "./direction-badge";
import { BiasScoreIndicator } from "./bias-score-indicator";
import { NormalizedStock } from "@/types/api";
import { format } from "date-fns";
import { Clock } from "lucide-react";

interface StockTableProps {
  stocks: NormalizedStock[];
}

export function StockTable({ stocks }: StockTableProps) {
  const [selectedStock, setSelectedStock] = useState<NormalizedStock | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, HH:mm");
    } catch {
      return dateString;
    }
  };

  const handleReasonClick = (stock: NormalizedStock) => {
    setSelectedStock(stock);
    setIsDialogOpen(true);
  };

  // Sort stocks: HIGH priority first, then by bias_score descending
  const sortedStocks = [...stocks].sort((a, b) => {
    if (a.priority === "HIGH" && b.priority !== "HIGH") return -1;
    if (a.priority !== "HIGH" && b.priority === "HIGH") return 1;
    return b.bias_score - a.bias_score;
  });

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Symbol</TableHead>
              <TableHead className="font-bold">Direction</TableHead>
              <TableHead className="font-bold">Priority</TableHead>
              <TableHead className="font-bold">Bias Score</TableHead>
              <TableHead className="font-bold">Reason</TableHead>
              <TableHead className="font-bold text-right">News</TableHead>
              <TableHead className="font-bold text-right">Latest Update</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStocks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No stocks in watchlist
                </TableCell>
              </TableRow>
            ) : (
              sortedStocks.map((stock) => (
                <TableRow
                  key={stock.symbol}
                  className="hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleReasonClick(stock)}
                >
                  <TableCell className="font-bold text-lg">{stock.symbol}</TableCell>
                  <TableCell>
                    <DirectionBadge direction={stock.direction} />
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={stock.priority} />
                  </TableCell>
                  <TableCell>
                    <BiasScoreIndicator
                      score={stock.bias_score}
                      isBullish={stock.direction === "Bullish"}
                    />
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {stock.reason}
                    </p>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {stock.news_count}
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(stock.latest_news_datetime)}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-2xl font-bold">{selectedStock?.symbol}</span>
              {selectedStock && (
                <>
                  <DirectionBadge direction={selectedStock.direction} />
                  <PriorityBadge priority={selectedStock.priority} />
                </>
              )}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Detailed analysis for {selectedStock?.symbol}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Bias Score</p>
                {selectedStock && (
                  <BiasScoreIndicator
                    score={selectedStock.bias_score}
                    isBullish={selectedStock.direction === "Bullish"}
                  />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">News Articles</p>
                <p className="font-bold text-lg">{selectedStock?.news_count}</p>
              </div>
              <div className="ml-auto">
                <p className="text-sm text-muted-foreground">Latest Update</p>
                <p className="text-sm font-medium">
                  {selectedStock && formatTime(selectedStock.latest_news_datetime)}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Analysis</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedStock?.reason}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
