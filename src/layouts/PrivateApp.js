import React from 'react';
import '../App.css';
import { Router } from "@reach/router";
import DashboardWrapper from '../components/shared/DashboardWrapper';
import Home from '../private/Home';
import AddNew from '../private/AddNew';
import Edit from '../private/Edit';
import Account from '../private/Account';

export default function PrivateApp(props) {

  return (
    <Router>
      <DashboardWrapper path="/">
        <Home path="/" default auth={props.auth} />
        <Account path="account" exact auth={props.auth} />
      </DashboardWrapper>
      <AddNew path="new" auth={props.auth} />
      <Edit path="edit/:id" auth={props.auth} />
    </Router>
  );

};
