import React from 'react';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: props => ({
    color: 'inherit',
    display: 'flex',
    flex: '0 1 auto',
    width: '100%',
    height: '25px', //50px
    //boxShadow: '0px 1px 20px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
    //backgroundColor: Variables.colors.white,
    position: 'fixed', //relative
    bottom: '0',
    zIndex: '1',
  })
});

export default function AppFooter(props) {
  const classes = useStyles(props);

  return (
    <footer className={`${classes.root} ${props.className}`}>
      {props.children}
    </footer>
  )
}
