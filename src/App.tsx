import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CoinGecko Explorer
          </Typography>
          <Tabs value={activeTab} onChange={handleTabChange} textColor="inherit">
            <Tab label="Markets" />
            <Tab label="Charts" />
            <Tab label="Trending" />
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className={classes.content}>
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h4">Markets</Typography>
          <Typography>Market data will go here</Typography>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h4">Charts</Typography>
          <Typography>Price charts will go here</Typography>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h4">Trending</Typography>
          <Typography>Trending coins will go here</Typography>
        </TabPanel>
      </Container>
    </div>
  );
}

export default App;
