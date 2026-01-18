export type Priority = "HIGH" | "MEDIUM";
export type Direction = "BULLISH" | "BEARISH";

export interface WatchlistStock {
  stock_symbol: string;
  direction: Direction;
  priority: Priority;
  bias_score: number;
  reason: string;
  news_count: number;
  sector: string | null;
  latest_news_datetime: string;
  date: string;
}

export interface BullishStock {
  stock_symbol: string;
  direction: Direction;
  priority: Priority;
  bias_score: number;
  reason: string;
  news_count: number;
  sector: string | null;
  latest_news_datetime: string;
  date: string;
}

export interface BearishStock {
  stock_symbol: string;
  direction: Direction;
  priority: Priority;
  bias_score: number;
  reason: string;
  news_count: number;
  sector: string | null;
  latest_news_datetime: string;
  date: string;
}

export interface Metadata {
  generated_at?: string;
  total_news_fetched?: number;
  total_analyzed?: number;
  bullish_count?: number;
  bearish_count?: number;
  watchlist_size?: number;
}

export interface ApiResponseBody {
  success: boolean;
  data: {
    watchlist: WatchlistStock[];
    bullish_stocks: BullishStock[];
    bearish_stocks: BearishStock[];
  };
  metadata?: Metadata;
}

export interface ApiResponse {
  statusCode: number;
  headers: {
    "Content-Type": string;
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Headers": string;
    "Access-Control-Allow-Methods": string;
  };
  body: ApiResponseBody;
}

// Normalized types for UI consumption
export interface NormalizedStock {
  symbol: string;
  direction: "Bullish" | "Bearish";
  priority: Priority;
  bias_score: number;
  reason: string;
  news_count: number;
  sector: string | null;
  latest_news_datetime: string;
  date: string;
}

export interface PremarketResponse {
  data: {
    watchlist: NormalizedStock[];
    bullish_stocks: NormalizedStock[];
    bearish_stocks: NormalizedStock[];
  };
  metadata: Metadata;
}
