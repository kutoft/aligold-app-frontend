import React, { useState } from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AddModal from './AddModal';
import NavigationBottom from './NavigationBottom';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../images/aligold-logo-icon.png';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Variables.colors.medium,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  img: {
    width: '35px',
  },
  name: {
    fontSize: '1.25rem',
    margin: '0 0 0 10px',
  }
});

export default function DashboardWrapper(props) {
  const classes = useStyles(props);
  const [mainNav, setMainNav] = useState('home');
  const [addModal, setAddModal] = useState(false);

  return (
    <div className={classes.root}>
      <AppHeader>
        <img src={logo} alt="AliGold" className={classes.img} />
        <h4 className={classes.name} >ALIGOLD CARE</h4>
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
