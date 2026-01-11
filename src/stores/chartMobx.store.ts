import { makeAutoObservable, runInAction } from 'mobx';
import { MarketChartData } from '../types/coingecko';
import { coinGeckoService } from '../services/coingecko.service';

class ChartMobxStore {
  chartData: MarketChartData | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Computed value - automatically memoized, only recalculates when chartData changes
  get transformedPriceData() {
    if (!this.chartData || !this.chartData.prices) return [];

    return this.chartData.prices.map(([timestamp, price]) => ({
      date: new Date(timestamp),
      value: price,
    }));
  }

  async fetchChartData(coinId: string, days: number) {
    if (this.transformedPriceData?.length) {
      return;
    }

    this.loading = true;
    this.error = null;

    try {
      const data = await coinGeckoService.getMarketChart(coinId, {
        vs_currency: 'usd',
        days,
      });

      runInAction(() => {
        this.chartData = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : 'Failed to fetch chart data';
        this.loading = false;
      });
    }
  }
}

export const chartMobxStore = new ChartMobxStore();
