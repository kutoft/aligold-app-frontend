import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { UserProvider, useUser } from './context/UserContext';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
const PrivateApp = React.lazy(() => import('./structure/private/PrivateApp'));
const PublicApp = React.lazy(() => import('./structure/public/PublicApp'));

export default function App(props) {
  const auth = useAuth();
  let isAuthenticated = auth.isAuthenticated;
  const [authState, setAuthState] = useState(isAuthenticated);

  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  return authState ?
      <React.Suspense fallback={<LoadingSpinner/>}>
        <UserProvider>
          <PrivateApp />
        </UserProvider>
      </React.Suspense>
      :
      <React.Suspense fallback={<LoadingSpinner/>}>
        <PublicApp />
      </React.Suspense>

};
