import React from 'react';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: props => ({
    flexGrow: '1',
    flexShrink: '0',
    flexBasis: 'calc(100vh - 100px)',
    width: '100vw',
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& .pageHeader': {
      position: 'sticky',
      top: '0',
      zIndex: '100',
      backgroundColor: Variables.colors.primaryDark,
      '& a': {
        color: Variables.colors.white,
      },
    },
  })
});

export default function AppMain(props) {
  const classes = useStyles(props);

  return (
    <main className={`${classes.root} ${props.className}`}>
      {props.children}
    </main>
  )
}
