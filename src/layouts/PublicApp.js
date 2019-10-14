import React from 'react';
import '../App.css';
import { Router } from "@reach/router";
import Login from '../public/Login';
import SignUp from '../public/SignUp';

export default function PublicApp(props) {

  return (
    <Router>
      <Login path="login" auth={props.auth} error={props.error} default />
      <SignUp path="signup" auth={props.auth} error={props.error} />
    </Router>
  );
}
