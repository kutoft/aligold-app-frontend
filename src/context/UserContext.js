import React from 'react';
import { useAuth } from './AuthContext';
const UserContext = React.createContext();

function UserProvider(props) {

  return (
   <UserContext.Provider value={useAuth().data.user} {...props} />
  )
}

const useUser = () => React.useContext(UserContext);
export { UserProvider, useUser };
