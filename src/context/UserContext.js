import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import Feathers from './Feathers';
const UserContext = React.createContext();

function UserProvider(props) {
  const auth = useAuth();
  const [isSubscribed, setIsSubscribed] = useState();
  const [user, setUser] = useState(auth.data.user);

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
        setIsSubscribed(!(subscription === false));
        toggleNotificationPermission(!(subscription === false));
        if (!(subscription === false)) {
          console.log('User IS subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
    });
  }

  const toggleNotificationPermission = (value) => {
    Feathers.service('users').patch(user._id, {push_notifacations_enabled: value})
      .then((response) => {
        console.log(response);
        setUser(response);
      })
      .catch((err) => {});
  }

  check();
  if(!isSubscribed) {
    requestNotificationPermission();
  }

  return (
   <UserContext.Provider value={{user, toggleNotificationPermission}} {...props} />
  )
}

const useUser = () => React.useContext(UserContext);
export { UserProvider, useUser };
