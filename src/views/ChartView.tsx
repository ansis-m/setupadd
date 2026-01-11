import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useChartStore } from '../stores/chart.store';

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

export const ChartView: React.FC = () => {
  const classes = useStyles();
  const chartRef = useRef<am4charts.XYChart | null>(null);
  const transformedData = useChartStore((state) => state.transformedPriceData);
  const loading = useChartStore((state) => state.loading);
  const error = useChartStore((state) => state.error);
  const fetchChartData = useChartStore((state) => state.fetchChartData);

  useEffect(() => {
    void fetchChartData('bitcoin', 7);
    console.log("fetch called");
  }, [fetchChartData]);

  useEffect(() => {
    const chart = am4core.create('chartdiv', am4charts.XYChart);
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
    chartRef.current.data = transformedData;
    chart.cursor = new am4charts.XYCursor();
    console.log("init done");
    return () => {
      chart.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current || transformedData.length === 0) {
      return;
    }
    chartRef.current.data = transformedData;
    chartRef.current.invalidateRawData();
    console.log("invalidated and set");
  }, [transformedData]);

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
    <Paper className={classes.paper}>
      <Typography variant="h5" className={classes.title}>
        Bitcoin Price (Last 7 Days)
      </Typography>
      <div id="chartdiv" className={classes.chartContainer}></div>
    </Paper>
  );
};
