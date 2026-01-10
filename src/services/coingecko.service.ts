import {
  CoinMarket,
  MarketChartData,
  TrendingResponse,
  MarketsSearchParams,
  MarketChartParams,
  PaginatedResponse,
} from '../types/coingecko';

const BASE_URL = 'https://api.coingecko.com/api/v3';

class CoinGeckoService {
  /**
   * Fetches cryptocurrency markets data
   * Note: CoinGecko API supports pagination natively
   */
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

  /**
   * Fetches market chart data (historical prices, market caps, volumes)
   */
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

  /**
   * Fetches trending coins
   * Note: This endpoint doesn't support pagination from CoinGecko
   */
  async getTrending(): Promise<TrendingResponse> {
    const response = await fetch(`${BASE_URL}/search/trending`);

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Pagination wrapper for trending coins
   * Simulates backend pagination by slicing the full dataset client-side
   */
  async getTrendingPaginated(page: number, perPage: number): Promise<PaginatedResponse<TrendingResponse['coins'][0]['item']>> {
    const trending = await this.getTrending();
    const allCoins = trending.coins.map(c => c.item);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = allCoins.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      page,
      per_page: perPage,
      total: allCoins.length,
      total_pages: Math.ceil(allCoins.length / perPage),
    };
  }
}

export const coinGeckoService = new CoinGeckoService();
