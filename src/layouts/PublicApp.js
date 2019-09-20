import React from 'react';
import '../App.css';
import { Router } from "@reach/router";
import SignIn from '../public/SignIn';

export default function PublicApp(props) {

  return (
    <Router>
      <SignIn path="signin" auth={props.auth} error={props.error} default />
    </Router>
  );
}
