import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Feathers from './Feathers';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
const PushContext = React.createContext();

function PushProvider(props) {
  const auth = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const check = () => {
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!')
    }
    if (('PushManager' in window)) {
      console.log('Push API Support!')
    }
  }

  const requestNotificationPermission = () => {
    window.Notification.requestPermission()
      .then((subscription) => {
        if(auth.user) {
          toggleNotificationPermission(!(subscription === false));
        }
        if (isSubscribed) {
          console.log('User IS subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
    });
  }

  const toggleNotificationPermission = (value) => {
    Feathers.service('users').patch(auth.data.user._id, {push_notifacations_enabled: value})
      .then((response) => {
        setIsSubscribed(value);
      })
      .catch((err) => {});
  }

  check();
  requestNotificationPermission();

  return (
    <PushContext.Provider
      value={{ isSubscribed, toggleNotificationPermission }}
      {...props}
    />
  );
}

const usePush = () => React.useContext(PushContext);
export { PushProvider, usePush };
