import React from 'react';
import { MarketsView } from '../views/MarketsView';
import { ChartView } from '../views/ChartView';
import { MobXChartView } from '../views/MobXChartView';

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
    component: ChartView,
  },
  {
    label: 'MobX Chart',
    title: 'MobX Chart',
    subtitle: 'MobX version of chart',
    component: MobXChartView,
  },
  {
    label: 'Trending',
    title: 'Trending',
    subtitle: 'Trending coins will go here',
  },
];
