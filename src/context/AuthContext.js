import React, { useState } from 'react';
import Feathers from './Feathers';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
const AuthContext = React.createContext();

function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const login = (credentials) => {
    const payload = Object.assign({ strategy: 'oauth' }, credentials);
    if(!credentials) {
      Feathers.reAuthenticate()
        .then((response) => {
          // If login is successful
          setData(response);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        })
    } else {
      Feathers.authenticate(payload)
        .then((response) => {
          // If login is successful
          setData(response);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        })
    }
  } // make a login request
  const register = (credentials) => {
    Feathers.service('users').create(credentials)
      .then((response) => {
        // If login is successful
        login(credentials)
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
      })
  } // register the user
  const logout = () => {
    setIsAuthenticated(false);
    Feathers.logout()
      .then(() => {
        setData({});
        
      })
      .catch()
  } // clear the token in localStorage and the user data

  return (
    <AuthContext.Provider
      value={{ data, isAuthenticated, login, logout, register, error, errorMessage }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
