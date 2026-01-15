import create from 'zustand';
import { persist } from 'zustand/middleware';
import { CoinMarket, MarketsSearchParams } from '../types/coingecko';
import { coinGeckoService } from '../services/coingecko.service';

interface MarketsState {
  searchParams: MarketsSearchParams;
  markets: CoinMarket[];
  loading: boolean;
  error: string | null;
  updateSearchParam: (field: keyof MarketsSearchParams, value: any) => void;
  fetchMarkets: () => Promise<void>;
  reset: () => void;
}

const defaultSearchParams: MarketsSearchParams = {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 50,
  page: 1,
  sparkline: false,
};

export const useMarketsStore = create<MarketsState>(
  persist(
    (set, get) => ({
      searchParams: defaultSearchParams,
      markets: [],
      loading: false,
      error: null,

      updateSearchParam: (field, value) => {
        set((state) => ({
          searchParams: {
            ...state.searchParams,
            [field]: value,
          },
        }));
      },

      fetchMarkets: async () => {
        const { searchParams, loading } = get();
        if (loading) return;

        set({ loading: true, error: null });

        try {
          const data = await coinGeckoService.getMarkets(searchParams);
          set({ markets: data, loading: false });
        } catch (err) {
          set({
            error:
              err instanceof Error ? err.message : 'Failed to fetch markets',
            loading: false,
          });
        }
      },

      reset: () => {
        set({
          searchParams: defaultSearchParams,
          markets: [],
          loading: false,
          error: null,
        });
      },
    }),
    {
      name: 'markets-storage',
      getStorage: () => localStorage,
    },
  ),
);
