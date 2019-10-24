import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import App from './App';
import AppProvider from './context/AppProvider';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';

const privateTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#14CBD7',
    },
    secondary: {
      main: '#070335',
    },
  },
});

ReactDOM.render(
  <AppProvider>
    <MuiThemeProvider theme={privateTheme}>
      <App />
    </MuiThemeProvider>
  </AppProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
