import React from 'react';
import PrivateApp from './layouts/PrivateApp';
import PublicApp from './layouts/PublicApp';

export default function App(props) {

  const auth = props.auth.isAuthenticated;

  return auth ? <PrivateApp {...props} /> : <PublicApp {...props} />

};
