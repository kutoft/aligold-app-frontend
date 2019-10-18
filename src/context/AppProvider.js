import React from 'react';
import { AuthProvider } from './AuthContext';

function AppProviders(props) {
  return (
    <AuthProvider>
      {props.children}
    </AuthProvider>
  )
}

export default AppProviders;
