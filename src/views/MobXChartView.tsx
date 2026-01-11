import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, CircularProgress, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { chartMobxStore } from '../stores/chartMobx.store';

am4core.useTheme(am4themes_animated);

const useStyles = makeStyles((theme) => ({
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  chartContainer: {
    width: '100%',
    height: 500,
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

export const MobXChartView: React.FC = observer(() => {
  const classes = useStyles();
  const chartDivRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<am4charts.XYChart | null>(null);

  const transformedData = chartMobxStore.transformedPriceData;
  const loading = chartMobxStore.loading;
  const error = chartMobxStore.error;

  useEffect(() => {
    void chartMobxStore.fetchChartData('bitcoin', 7);
  }, []);

  useEffect(() => {
    if (!chartDivRef.current) return;

    const chart = am4core.create(chartDivRef.current, am4charts.XYChart);
    chartRef.current = chart;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.title.text = 'Date';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Price (USD)';

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.strokeWidth = 2;
    series.name = 'Bitcoin Price';
    series.tooltipText = '{dateX}: [bold]${valueY}[/]';

    chart.cursor = new am4charts.XYCursor();

    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current || transformedData.length === 0) return;
    chartRef.current.data = transformedData;
  }, [transformedData]);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Bitcoin Price (Last 7 Days) - MobX Version
      </Typography>
      {loading && (
        <Box className={classes.loading}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box className={classes.loading}>
          <Typography color="error">{error}</Typography>
        </Box>
      )}
      <div
        ref={chartDivRef}
        className={classes.chartContainer}
        style={{ display: loading || error ? 'none' : 'block' }}
      ></div>
    </Paper>
  );
});
