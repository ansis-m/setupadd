import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useMarketsStore } from '../stores/markets.store';
import { MarketsPagination } from '../components/MarketsPagination';

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  positive: {
    color: theme.palette.success.main,
  },
  negative: {
    color: theme.palette.error.main,
  },
  coinImage: {
    width: 24,
    height: 24,
    marginRight: theme.spacing(1),
    verticalAlign: 'middle',
  },
}));

export const MarketsView: React.FC = () => {
  const classes = useStyles();
  const markets = useMarketsStore((state) => state.markets);
  const loading = useMarketsStore((state) => state.loading);
  const error = useMarketsStore((state) => state.error);
  const fetchMarkets = useMarketsStore((state) => state.fetchMarkets);

  useEffect(() => {
    if (markets.length === 0) {
      void fetchMarkets();
    }
  }, [fetchMarkets, markets.length]);

  if (loading) {
    return (
      <Box className={classes.loading}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.loading}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Volume (24h)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {markets.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>{coin.market_cap_rank}</TableCell>
                <TableCell>
                  <img src={coin.image} alt={coin.name} className={classes.coinImage} />
                  {coin.name}{' '}
                  <Typography variant="caption" color="textSecondary">
                    ({coin.symbol.toUpperCase()})
                  </Typography>
                </TableCell>
                <TableCell align="right">${coin.current_price.toLocaleString()}</TableCell>
                <TableCell
                  align="right"
                  className={coin.price_change_percentage_24h && coin.price_change_percentage_24h >= 0 ? classes.positive : classes.negative}
                >
                  {coin.price_change_percentage_24h ? `${coin.price_change_percentage_24h.toFixed(2)}%` : 'N/A'}
                </TableCell>
                <TableCell align="right">${coin.market_cap.toLocaleString()}</TableCell>
                <TableCell align="right">${coin.total_volume.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MarketsPagination />
    </>
  );
};
