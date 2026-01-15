import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TabPanel } from './components/TabPanel';
import { tabsConfig } from './config/tabs.config';

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

function App() {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  const currentTab = tabsConfig[activeTab];
  const CurrentComponent = currentTab.component;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CoinGecko Explorer
          </Typography>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="inherit"
          >
            {tabsConfig.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" className={classes.content}>
        <TabPanel>
          {CurrentComponent ? (
            <CurrentComponent />
          ) : (
            <>
              <Typography variant="h4">{currentTab.title}</Typography>
              <Typography>{currentTab.subtitle}</Typography>
            </>
          )}
        </TabPanel>
      </Container>
    </div>
  );
}

export default App;
