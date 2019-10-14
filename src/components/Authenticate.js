import React, { useState } from 'react';
import Feathers from './Feathers';

export default function Authenticate(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();

  if(isLogout === false) {
    Feathers.authentication.getAccessToken()
      .then((token) => {
        console.log(token);
        if(token !== null) {
          Feathers.authentication.reAuthenticate()
            .then((response) => {
              console.log(response);
              setIsAuthenticated(true);
            })
            .catch();
        }
      })
      .catch();
  }

  const login = (credentials) => {
    const payload = Object.assign({ strategy: 'local' }, credentials);
    if(!credentials) {
      Feathers.reAuthenticate(payload)
        .then((response) => {
          // If login is successful
          setData(response);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error);
        })
    }
    Feathers.authenticate(payload)
      .then((response) => {
        // If login is successful
        setData(response);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error);
      })
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
    setIsLogout(true);
    Feathers.logout();
  } // clear the token in localStorage and the user data

  return (
    React.cloneElement(props.children, {auth: {isAuthenticated, setIsAuthenticated, data, login, logout, register, error, errorMessage}})
  )
};
