import {
  CoinMarket,
  MarketChartData,
  TrendingResponse,
  MarketsSearchParams,
  MarketChartParams,
} from '../types/coingecko';

const BASE_URL = 'https://api.coingecko.com/api/v3';

class CoinGeckoService {
  async getMarkets(params: MarketsSearchParams): Promise<CoinMarket[]> {
    const queryParams = new URLSearchParams({
      vs_currency: params.vs_currency,
      order: params.order,
      per_page: params.per_page.toString(),
      page: params.page.toString(),
      sparkline: (params.sparkline || false).toString(),
    });

    if (params.price_change_percentage) {
      queryParams.append('price_change_percentage', params.price_change_percentage);
    }

    const response = await fetch(`${BASE_URL}/coins/markets?${queryParams}`);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getMarketChart(coinId: string, params: MarketChartParams): Promise<MarketChartData> {
    const queryParams = new URLSearchParams({
      vs_currency: params.vs_currency,
      days: params.days.toString(),
    });

    if (params.interval) {
      queryParams.append('interval', params.interval);
    }

    const response = await fetch(`${BASE_URL}/coins/${coinId}/market_chart?${queryParams}`);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getTrending(): Promise<TrendingResponse> {
    const response = await fetch(`${BASE_URL}/search/trending`);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const coinGeckoService = new CoinGeckoService();
