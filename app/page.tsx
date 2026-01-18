"use client";

import { usePremarketData } from "@/hooks/usePremarketData";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { StatsCard } from "@/components/ui/stats-card";
import { StockTable } from "@/components/ui/stock-table";
import { StockCard } from "@/components/ui/stock-card";
import { Separator } from "@/components/ui/separator";
import {
  Newspaper,
  FileText,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const { data, isLoading, isError, error, refetch } = usePremarketData();

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <ErrorState
          message={error?.message || "Failed to fetch premarket data"}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <EmptyState message="No premarket data available" />
      </div>
    );
  }

  const { metadata, data: stockData } = data;

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMMM dd, yyyy 'at' HH:mm");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Premarket Stock Suggester
        </h1>
        <p className="text-lg text-muted-foreground">
          AI-powered news-based stock signals
        </p>
        {metadata.generated_at && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Generated: {formatDate(metadata.generated_at)}</span>
          </div>
        )}
      </div>

      <Separator />

      {/* Market Overview Cards */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total News Fetched"
            value={metadata.total_news_fetched ?? 0}
            icon={Newspaper}
            trend="neutral"
          />
          <StatsCard
            title="Total Analyzed"
            value={metadata.total_analyzed ?? 0}
            icon={FileText}
            trend="neutral"
          />
          <StatsCard
            title="Bullish Stocks"
            value={metadata.bullish_count ?? 0}
            icon={TrendingUp}
            trend="up"
          />
          <StatsCard
            title="Bearish Stocks"
            value={metadata.bearish_count ?? 0}
            icon={TrendingDown}
            trend="down"
          />
        </div>
      </div>

      <Separator />

      {/* High Priority Watchlist */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-6 w-6" />
          <h2 className="text-2xl font-semibold">
            High Priority Watchlist ({metadata.watchlist_size ?? stockData.watchlist.length})
          </h2>
        </div>
        {stockData.watchlist.length === 0 ? (
          <EmptyState message="No stocks in watchlist" />
        ) : (
          <StockTable stocks={stockData.watchlist} />
        )}
      </div>

      <Separator />

      {/* Bullish Stocks Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-semibold text-green-600">
            Bullish Stocks ({stockData.bullish_stocks.length})
          </h2>
        </div>
        {stockData.bullish_stocks.length === 0 ? (
          <EmptyState message="No bullish stocks found" />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stockData.bullish_stocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                biasScore={stock.bias_score}
                priority={stock.priority}
                reason={stock.reason}
                latestNewsTime={stock.latest_news_datetime}
                newsCount={stock.news_count}
                isBullish={true}
              />
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Bearish Stocks Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-semibold text-red-600">
            Bearish Stocks ({stockData.bearish_stocks.length})
          </h2>
        </div>
        {stockData.bearish_stocks.length === 0 ? (
          <EmptyState message="No bearish stocks found" />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stockData.bearish_stocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                biasScore={stock.bias_score}
                priority={stock.priority}
                reason={stock.reason}
                latestNewsTime={stock.latest_news_datetime}
                newsCount={stock.news_count}
                isBullish={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
