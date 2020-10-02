import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AppHeader from './Components/AppHeader';
import AppNavs from './Components/AppNavs';
import { createMuiTheme, ThemeProvider, makeStyles, Theme } from '@material-ui/core/styles'
import { Box } from '@material-ui/core';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Join from './Pages/Join';
import Chat from './Pages/Chat';
import './styles.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: "Noto Sans KR, sans-serif",
    fontSize: 14,
  },
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#f05545',
      main: '#b71c1c',
      dark: '#7f0000',
      contrastText: '#ffffff',
    },
  },
});

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  page: {
    width: '100%',
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
  }
}));

function App() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppHeader />
        <BrowserRouter>

          <AppNavs>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/join" component={Join} />
              <Route path="/chat" component={Chat} />
            </Switch>


          </AppNavs>
        </BrowserRouter>
      </ThemeProvider>
    </Box>
  )
}

export default App;