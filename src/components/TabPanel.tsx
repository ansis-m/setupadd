import React from 'react';
import { Box } from '@material-ui/core';

interface TabPanelProps {
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <Box p={3}>{children}</Box>;
};
