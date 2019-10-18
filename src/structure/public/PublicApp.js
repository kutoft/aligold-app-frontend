import React from 'react';
import '../../App.css';
import { Router, navigate } from "@reach/router";
import { useAuth } from '../../context/AuthContext';
import Login from './pages/Login';

export default function PublicApp(props) {

  return (
    <Router>
      <Login path="login" default />
    </Router>
  );
}

function Oauth(props) {
  const auth = useAuth();
  auth.login();
  return null;
}
