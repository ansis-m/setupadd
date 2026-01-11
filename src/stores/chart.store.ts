import create from 'zustand';
import { MarketChartData } from '../types/coingecko';
import { coinGeckoService } from '../services/coingecko.service';

interface ChartDataPoint {
  date: Date;
  value: number;
}

interface ChartState {
  chartData: MarketChartData | null;
  transformedPriceData: ChartDataPoint[];
  loading: boolean;
  error: string | null;
  fetchChartData: (coinId: string, days: number) => Promise<void>;
}

export const useChartStore = create<ChartState>((set, get) => ({
  chartData: null,
  transformedPriceData: [],
  loading: false,
  error: null,

  fetchChartData: async (coinId: string, days: number) => {
    const {chartData} = get();

    if(!!chartData) {
      return;
    }
    set({ loading: true, error: null });

    try {
      const data = await coinGeckoService.getMarketChart(coinId, {
        vs_currency: 'usd',
        days,
      });

      // Transform data in store, not component
      const transformed = data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp),
        value: price,
      }));

      set({ chartData: data, transformedPriceData: transformed, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to fetch chart data',
        loading: false,
      });
    }
  },
}));
