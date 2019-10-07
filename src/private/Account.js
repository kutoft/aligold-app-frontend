import React from 'react';
import AppMain from '../components/shared/AppMain';
import AppFooter from '../components/shared/AppFooter';
import NavigationBottom from '../components/shared/NavigationBottom';
import Button from '@material-ui/core/Button';

export default function Account(props) {

  function handleLogout() {
    props.auth.logout();
  };

  return (
    <AppMain>
      <div className="pageHeader">
        <h2>Account</h2>
      </div>
      <div className="list">
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </div>
    </AppMain>
  )
};
