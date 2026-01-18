# 📈 Premarket Stock Suggester

A modern, AI-powered web application that displays premarket stock suggestions based on news sentiment analysis. Built with Next.js, TypeScript, and shadcn/ui.

## ✨ Features

- **Real-time Stock Analysis**: Displays bullish and bearish stock signals based on news sentiment
- **High Priority Watchlist**: Sortable table showing stocks with highest priority and bias scores
- **Market Overview Dashboard**: Key statistics about news coverage and stock signals
- **Responsive Design**: Fully responsive UI that works on all devices
- **Dark Mode Ready**: Built-in dark mode support with smooth transitions
- **Auto-refresh**: Automatically fetches new data every 5 minutes
- **Clean UI**: Trading-dashboard aesthetic with intuitive color coding

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Data Fetching**: TanStack React Query
- **HTTP Client**: Axios
- **Date Formatting**: date-fns
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd StockSuggestor
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

The API endpoint is already configured in `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://hwkhkt7ao8.execute-api.us-east-1.amazonaws.com/dev
```

You can update this to point to a different API endpoint if needed.

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📊 API Integration

The application fetches data from the `/watchlist` endpoint. The API returns data in the following format:

```typescript
{
  "statusCode": 200,
  "headers": {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
  },
  "body": {
    "success": true,
    "data": {
      "watchlist": [
        {
          "stock_symbol": "RELIANCE",
          "direction": "BULLISH" | "BEARISH",
          "priority": "HIGH" | "MEDIUM",
          "bias_score": 3.5,
          "reason": "Strong earnings report and positive market sentiment",
          "news_count": 15,
          "sector": "Finance",
          "latest_news_datetime": "2024-01-18T09:30:00",
          "date": "2024-01-18"
        }
      ],
      "bullish_stocks": [...],
      "bearish_stocks": [...]
    },
    "metadata": {
      "generated_at": "2024-01-18T09:30:00",
      "total_news_fetched": 150,
      "total_analyzed": 145,
      "bullish_count": 25,
      "bearish_count": 18,
      "watchlist_size": 10
    }
  }
}
```

The application automatically normalizes the API response data to a UI-friendly format.

## 🎨 Components

### Core Components

- **StatsCard**: Displays key metrics with icons and trends
- **StockTable**: Sortable table for watchlist stocks
- **StockCard**: Individual stock card with expandable analysis
- **PriorityBadge**: Visual indicator for stock priority
- **DirectionBadge**: Bullish/Bearish indicator with icons
- **BiasScoreIndicator**: Color-coded bias score display
- **LoadingSkeleton**: Loading state UI
- **ErrorState**: Error handling with retry functionality
- **EmptyState**: Empty data state messaging

### Component Features

- **Auto-sorting**: Watchlist sorted by priority (HIGH → MEDIUM) then bias score
- **Truncation**: Long reasons truncated with "Read more" accordion
- **Time Formatting**: Automatic date/time formatting to IST
- **Visual Signals**: Green for bullish, red for bearish
- **High Conviction Badge**: Shown when bullish bias_score > 3
- **High Risk Badge**: Shown for HIGH priority bearish stocks

## 🎯 Project Structure

```
StockSuggestor/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles and themes
├── components/
│   ├── providers/
│   │   └── query-provider.tsx
│   └── ui/
│       ├── badge.tsx
│       ├── bias-score-indicator.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── direction-badge.tsx
│       ├── empty-state.tsx
│       ├── error-state.tsx
│       ├── loading-skeleton.tsx
│       ├── priority-badge.tsx
│       ├── stats-card.tsx
│       ├── stock-card.tsx
│       └── stock-table.tsx
├── hooks/
│   └── usePremarketData.ts  # React Query hook
├── lib/
│   ├── api.ts               # API client
│   └── utils.ts             # Utility functions
├── types/
│   └── api.ts               # TypeScript types
└── .env.local               # Environment variables
```

## 🔧 Configuration

### React Query Settings

The application uses the following React Query configuration:

- **Refetch Interval**: 5 minutes
- **Retry Attempts**: 1
- **Stale Time**: 5 minutes
- **GC Time**: 10 minutes

Modify these settings in `hooks/usePremarketData.ts`.

### API Endpoint

Update the API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

## 🌙 Dark Mode

The application supports dark mode out of the box. Users can toggle dark mode using their system preferences. All components are styled with dark mode variants.

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: Single column layout
- **Tablet (md)**: 2-column grid for cards
- **Desktop (lg)**: 3-4 column grid for cards

## ⚡ Performance

- **Lighthouse Score**: Target > 90
- **First Contentful Paint**: < 2s
- **Bundle Optimization**: Tree-shaking and code splitting
- **Image Optimization**: Next.js automatic image optimization

## 🔮 Future Enhancements

- [ ] Sector filtering
- [ ] Auto-refresh toggle control
- [ ] Historical date selector
- [ ] TradingView chart embeds
- [ ] Saved watchlists
- [ ] Telegram/WhatsApp alerts
- [ ] User authentication
- [ ] Custom notifications

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

If you encounter any issues, please create an issue on GitHub.

---

Built with ❤️ using Next.js and shadcn/ui
