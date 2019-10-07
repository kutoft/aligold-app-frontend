import React from 'react';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: 'inherit',
    display: 'flex',
    flex: '0 1 auto',
    alignItems: 'center',
    width: '100%',
    height: '50px',
    padding: '10px',
    boxShadow: '1px 0px 3px 0px rgba(0,0,0,0.2), 1px 0px 1px 0px rgba(0,0,0,0.14), 2px 0px 1px -1px rgba(0,0,0,0.12)',
    backgroundColor: Variables.colors.white,
    position: 'relative',
    zIndex: '1',
  }
});

export default function AppHeader(props) {
  const classes = useStyles(props);

  return (
    <header className={`${classes.root} ${props.className}`}>
      {props.children}
    </header>
  )
}
