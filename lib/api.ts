import axios from "axios";
import {
  PremarketResponse,
  ApiResponseBody,
  NormalizedStock,
  WatchlistStock,
  BullishStock,
  BearishStock,
} from "@/types/api";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize direction from API format (BULLISH/BEARISH) to UI format (Bullish/Bearish)
const normalizeDirection = (direction: string): "Bullish" | "Bearish" => {
  return direction === "BULLISH" ? "Bullish" : "Bearish";
};

// Normalize stock data from API format to UI format
const normalizeStock = (
  stock: WatchlistStock | BullishStock | BearishStock
): NormalizedStock => {
  return {
    symbol: stock.stock_symbol,
    direction: normalizeDirection(stock.direction),
    priority: stock.priority,
    bias_score: stock.bias_score,
    reason: stock.reason,
    news_count: stock.news_count,
    sector: stock.sector,
    latest_news_datetime: stock.latest_news_datetime,
    date: stock.date,
  };
};

export const fetchPremarketData = async (): Promise<PremarketResponse> => {
  const { data } = await api.get<ApiResponseBody>("/watchlist");

  // Extract the actual data from the API response
  const apiData = data.data;

  // Normalize the data
  const normalizedWatchlist = apiData.watchlist.map(normalizeStock);
  const normalizedBullish = apiData.bullish_stocks.map(normalizeStock);
  const normalizedBearish = apiData.bearish_stocks.map(normalizeStock);

  // Use metadata from API or calculate from data
  const metadata = data.metadata || {
    generated_at: new Date().toISOString(),
    total_news_fetched: normalizedWatchlist.reduce(
      (sum, stock) => sum + stock.news_count,
      0
    ),
    total_analyzed: normalizedWatchlist.length + normalizedBullish.length + normalizedBearish.length,
    bullish_count: normalizedBullish.length,
    bearish_count: normalizedBearish.length,
    watchlist_size: normalizedWatchlist.length,
  };

  return {
    data: {
      watchlist: normalizedWatchlist,
      bullish_stocks: normalizedBullish,
      bearish_stocks: normalizedBearish,
    },
    metadata,
  };
};
