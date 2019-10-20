import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { useAuth } from '../../context/AuthContext';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AddModal from './AddModal';
import NavigationBottom from './NavigationBottom';
import { Icon } from '../../images/Icon';
import Popover from '@material-ui/core/Popover';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Variables } from '../../constants/Variables';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.secondary.main,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  img: {
    width: '30px',
  },
  name: {
    fontSize: '1.25rem',
    fontWeight: 'normal',
    margin: '0 0 0 10px',
    '& .bold': {
      fontWeight: 'bold',
    }
  },
  user: {
    '& img': {
      width: '30px',
      overflow: 'hidden',
      borderRadius: '50%',
    }
  },
  userMenu: {
    padding: '1rem',
  },
  logout: {
    marginTop: '1rem',
  },
}));

export default function DashboardWrapper(props) {
  const classes = useStyles(props);
  const userContext = useUser();
  const auth = useAuth();
  const [mainNav, setMainNav] = useState('home');
  const [addModal, setAddModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleLogout() {
    auth.logout();
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'user-menu' : undefined;

  return (
    <div className={classes.root}>
      <AppHeader className={classes.header}>
        <div className={classes.logo}>
          <div className={classes.img}>
            <Icon/>
          </div>
          <div>
            <h4 className={classes.name}>BRAIN<span className="bold">BASIN</span></h4>
          </div>
        </div>
        <div className={classes.user}>
          <img src={userContext.user.picture} alt={userContext.user.name} onClick={handleClick} />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <div className={classes.userMenu}>
              <p>{userContext.user.name}</p>
              <p className={classes.email}>{userContext.user.email}</p>
              <Divider />
              <div>
                <FormControlLabel
                  control={<Switch checked={userContext.user.push_notifacations_enabled} color="primary" onChange={(value) => userContext.toggleNotificationPermission(!userContext.user.push_notifacations_enabled)} />}
                  label='Push Notifications'
                />
              </div>
              <Divider />
              <div className={classes.logout}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Popover>
        </div>
      </AppHeader>
      {props.children}
      <AddModal
        addModal={addModal}
        setAddModal={setAddModal}
      />
      <AppFooter>
        <NavigationBottom
          mainNav={mainNav}
          setMainNav={setMainNav}
          addModal={addModal}
          setAddModal={setAddModal}
        />
      </AppFooter>
    </div>
  );

}
