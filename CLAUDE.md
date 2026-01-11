# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ IMPORTANT: This is a Learning Project

This is NOT a production application. The primary goal is to learn specific libraries that will be used in an upcoming job:
- **MobX 6.13** - Render optimization for lists/tables/charts
- **Zustand 3.5** - State management with persistence
- **Material-UI v4** - UI components
- **Charts** (amCharts) - Data visualization

**Why these specific versions?**
These versions (though outdated) match the stack used in the next job. The focus is on learning patterns and optimization techniques.

**Why cryptocurrency data?**
Using CoinGecko API provides interesting, real-world data without building a boring CRUD app. The crypto domain is just a vehicle for learning the libraries.

## Project Overview

CoinGecko Explorer - A cryptocurrency market data viewer that integrates with the CoinGecko public API to display market data, charts, and trending coins.

## Learning Goals & Exploration Areas

### MobX - Render Optimization Focus
**Primary Goal**: Learn how MobX optimizes rendering to minimize re-renders in performance-critical components.

**Context from real project**: MobX is used specifically to "render the least amount of elements" - this is crucial for:
- Large lists/tables (e.g., crypto market data with hundreds of rows)
- Real-time updating charts
- Complex data grids with frequent updates

**What to explore**:
- How MobX's observables and observers minimize component re-renders
- Using `observer()` HOC vs `Observer` component for granular rendering
- Computed values to derive state without triggering unnecessary renders
- Comparing MobX vs React's default rendering behavior for large lists
- Strategies for optimizing tables with many rows and frequent data updates

**Current Status**: MobX is in dependencies but not yet actively used. Need to implement examples comparing React default vs MobX-optimized rendering.

### Zustand - State Management
- Understand Zustand's hook-based API and selector pattern
- Learn persistence middleware with localStorage
- Compare Zustand's simplicity vs MobX's reactivity model

### Material-UI v4 & Charts
- Master Material-UI component patterns and theming
- Implement data visualizations with amCharts
- Integrate charts with state management for real-time updates

## Tech Stack

- **React 16.8** with TypeScript
- **Material-UI v4** for UI components
- **Zustand 3.5** for state management with localStorage persistence
- **MobX 6.13** for render optimization (to be implemented)
- **amCharts 3 & 4** for charts and data visualization
- **CoinGecko API** for cryptocurrency data
- **React Scripts 5** (Create React App)
- **Jest** for testing
- **ESLint + Prettier** with husky and lint-staged for pre-commit checks

## Commands

### Development
```bash
npm start              # Run development server on localhost:3000
```

### Building
```bash
npm run build          # Clean and build library to dist/
npm run build-lib      # Build with Babel (TypeScript -> JS, includes version env var)
npm run clean          # Remove dist/ folder
```

### Testing & Quality
```bash
npm test               # Run Jest tests in jsdom environment
npm run check-typing   # Run TypeScript compiler checks without emitting files
```

### Linting
Linting runs automatically on pre-commit via husky. To run manually:
```bash
npx eslint src/       # Lint all source files
npx prettier --write src/  # Format all source files
```

## Architecture

### Directory Structure
```
src/
├── components/      # Reusable UI components (TabPanel, MarketsPagination)
├── config/         # Configuration files (tabs.config.tsx)
├── services/       # API service layer (coingecko.service.ts)
├── stores/         # Zustand state stores (markets.store.ts)
├── theme/          # Material-UI theme configuration
├── types/          # TypeScript type definitions (coingecko.ts)
└── views/          # Page-level components (MarketsView.tsx)
```

### State Management Pattern

**Zustand with Persistence:**
- State stores in `src/stores/` use Zustand's `create` and `persist` middleware
- Stores persist to localStorage automatically (e.g., `markets-storage` key)
- Components consume stores via hook selectors: `useMarketsStore((state) => state.markets)`
- Store actions are defined as methods on the store object (e.g., `fetchMarkets`, `updateSearchParam`)

Example store structure:
```typescript
export const useMarketsStore = create<State>(
  persist(
    (set, get) => ({
      // State
      data: [],
      loading: false,

      // Actions
      fetchData: async () => { /* ... */ },
      updateField: (field, value) => { /* ... */ }
    }),
    {
      name: 'storage-key',
      getStorage: () => localStorage
    }
  )
);
```

### Service Layer Pattern

API calls are centralized in `src/services/`:
- Services are singleton classes instantiated once and exported
- Each service method returns strongly-typed data using types from `src/types/`
- Services handle query parameter serialization and error responses
- Example: `coinGeckoService.getMarkets(params)` returns `Promise<CoinMarket[]>`

### View-Component Architecture

- **Views** (`src/views/`): Page-level components that connect to stores and coordinate data fetching
- **Components** (`src/components/`): Reusable, presentation-focused UI components
- Views consume store data via selectors and trigger store actions
- Components receive props from views and focus on rendering

### Tab Configuration System

The app uses a centralized tab configuration in `src/config/tabs.config.tsx`:
- Each tab defines: `label`, `title`, `subtitle`, and optional `component`
- Tabs without components show title/subtitle as placeholder
- Tab rendering is handled generically in `App.tsx` based on config

### Type Safety

All CoinGecko API responses have TypeScript types in `src/types/coingecko.ts`:
- API response types: `CoinMarket`, `MarketChartData`, `TrendingResponse`
- Request parameter types: `MarketsSearchParams`, `MarketChartParams`
- Keep types in sync with actual API responses to maintain type safety

## Build Configuration

- **Output**: Library builds to `dist/` via Babel (not webpack bundle)
- **TypeScript**: Strict mode enabled, compiles to ES5
- **Version**: `REACT_APP_VERSION` environment variable injected from `package.version`
- **Node Version**: Volta pins to Node 18.20.2 and npm 8.19.4

## Key Patterns to Follow

When adding new features:
1. Create TypeScript types in `src/types/` first
2. Add service methods in appropriate service class
3. Create Zustand store with persistence if state needs to persist
4. Build view component that consumes store
5. Add reusable presentational components in `src/components/`
6. Register new tabs in `src/config/tabs.config.tsx`

## Learning-Focused Development

When implementing features, consider:
- **Experiment with both approaches**: Try implementing with plain React/Zustand first, then optimize with MobX to see the difference
- **Measure render performance**: Use React DevTools Profiler to measure re-renders before/after MobX optimization
- **Document findings**: Add comments explaining why MobX was used and what it optimizes
- **Focus on lists/tables**: Prioritize learning MobX with components that render many items (markets table, chart data points)
