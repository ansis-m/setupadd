// CoinGecko API TypeScript Types - Based on actual API responses

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface TrendingCoinItem {
  id: string;
  coin_id: number;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  small: string;
  large: string;
  slug: string;
  price_btc: number;
  score: number;
  data: {
    price: number;
    price_btc: string;
    price_change_percentage_24h: {
      [currency: string]: number;
    };
    market_cap: string;
    market_cap_btc: string;
    total_volume: string;
    total_volume_btc: string;
    sparkline: string;
    content: any | null;
  };
}

export interface TrendingNFT {
  id: string;
  name: string;
  floor_price_in_native_currency: number;
  floor_price_24h_percentage_change: number;
  data: {
    floor_price: string;
    h24_volume: string;
    h24_average_sale_price: string;
  };
}

export interface TrendingCategory {
  id: number;
  name: string;
  coins_count: string;
  market_cap_change_percentage_24h: {
    [currency: string]: number;
  };
}

export interface TrendingResponse {
  coins: {
    item: TrendingCoinItem;
  }[];
  nfts: TrendingNFT[];
  categories: TrendingCategory[];
}

// Search Parameters
export interface MarketsSearchParams {
  vs_currency: string;
  order: 'market_cap_desc' | 'market_cap_asc' | 'volume_desc' | 'volume_asc' | 'id_desc' | 'id_asc';
  per_page: number;
  page: number;
  sparkline?: boolean;
  price_change_percentage?: string;
}

export interface MarketChartParams {
  vs_currency: string;
  days: number | 'max';
  interval?: 'daily';
}

// Pagination wrapper for client-side pagination
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
