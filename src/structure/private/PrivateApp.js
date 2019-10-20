import React from 'react';
import '../../App.css';
import { Router } from "@reach/router";
import DashboardWrapper from '../../components/shared/DashboardWrapper';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import Edit from './pages/Edit';
import Account from './pages/Account';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

export default function PrivateApp(props) {
  const privateTheme = createMuiTheme({
    palette: {
      primary: {
        main: '#14CBD7',
      },
      secondary: {
        main: '#070335',
      },
    }
  });

  return (
    <MuiThemeProvider theme={privateTheme} >
      <Router>
        <DashboardWrapper path="/">
          <Home path="/" default auth={props.auth} />
          <Account path="account" exact auth={props.auth} />
        </DashboardWrapper>
        <AddNew path="new" auth={props.auth} />
        <Edit path="edit/:id" auth={props.auth} />
      </Router>
    </MuiThemeProvider>
  );

};
