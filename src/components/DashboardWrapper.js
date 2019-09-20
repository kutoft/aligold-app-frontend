import React from 'react';
import { Variables } from '../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Variables.colors.light,
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
    },
  }
});

export default function DashboardWrapper(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      {props.children}
    </div>
  );

}
