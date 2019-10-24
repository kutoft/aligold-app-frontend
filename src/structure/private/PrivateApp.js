import React from 'react';
import { Router } from '@reach/router';
import DashboardWrapper from '../../components/shared/DashboardWrapper';
import Home from './pages/Home';
import AddNew from './pages/AddNew';
import Edit from './pages/Edit';
import Account from './pages/Account';

export default function PrivateApp(props) {
  return (
    <Router>
      <DashboardWrapper path="/">
        <Home path="/" default />
        <Account path="account" exact />
      </DashboardWrapper>
      <AddNew path="new" />
      <Edit path="edit/:id" />
    </Router>
  );
}
