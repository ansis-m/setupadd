import React from 'react';

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
