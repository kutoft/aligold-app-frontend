import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    borderRadius: '30px 30px 0 0',
    boxShadow:
      '0px 1px 20px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
}));

export default function PaperBody(props) {
  const classes = useStyles();

  return <Paper className={classes.root}>{props.children}</Paper>;
}
