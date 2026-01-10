import React from 'react';
import { MarketsView } from '../views/MarketsView';

export interface TabConfig {
  label: string;
  title: string;
  subtitle: string;
  component?: React.ComponentType;
}

export const tabsConfig: TabConfig[] = [
  {
    label: 'Markets',
    title: 'Markets',
    subtitle: 'Market data will go here',
    component: MarketsView,
  },
  {
    label: 'Charts',
    title: 'Charts',
    subtitle: 'Price charts will go here',
  },
  {
    label: 'Trending',
    title: 'Trending',
    subtitle: 'Trending coins will go here',
  },
];
