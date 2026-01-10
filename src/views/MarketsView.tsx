import React, { useState, useEffect } from 'react';
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
import { CoinMarket, MarketsSearchParams } from '../types/coingecko';
import { coinGeckoService } from '../services/coingecko.service';

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
  const [markets, setMarkets] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useState<MarketsSearchParams>({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 50,
    page: 1,
    sparkline: false,
  });

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await coinGeckoService.getMarkets(searchParams);
        setMarkets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch markets');
      } finally {
        setLoading(false);
      }
    };

    fetchMarkets();
  }, [searchParams]);

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
                className={coin.price_change_percentage_24h >= 0 ? classes.positive : classes.negative}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell align="right">${coin.market_cap.toLocaleString()}</TableCell>
              <TableCell align="right">${coin.total_volume.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
