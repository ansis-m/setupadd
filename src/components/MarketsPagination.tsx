import React from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMarketsStore } from '../stores/markets.store';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  pageControls: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  perPageControl: {
    minWidth: 120,
  },
}));

export const MarketsPagination: React.FC = () => {
  const classes = useStyles();
  const page = useMarketsStore((state) => state.searchParams.page);
  const perPage = useMarketsStore((state) => state.searchParams.per_page);
  const updateSearchParam = useMarketsStore((state) => state.updateSearchParam);
  const fetchMarkets = useMarketsStore((state) => state.fetchMarkets);

  const handlePageChange = (newPage: number) => {
    updateSearchParam('page', newPage);
    fetchMarkets();
  };

  const handlePerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateSearchParam('per_page', event.target.value as number);
    updateSearchParam('page', 1);
    fetchMarkets();
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.pageControls}>
        <Button
          variant="contained"
          color="primary"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <Typography>Page {page}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </Box>

      <FormControl className={classes.perPageControl}>
        <InputLabel>Per Page</InputLabel>
        <Select value={perPage} onChange={handlePerPageChange}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
