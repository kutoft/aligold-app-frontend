import React from 'react';
import { Variables } from '../constants/Variables';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    // borderLeft: `5px solid ${Variables.colors.dark}`,
    '& p': {
      margin: '0 0 5px',
      fontSize: Variables.fontSize.tiny,
    },
    '& h3': {
      margin: '0',
    },
    '& .isPinned': {
      position: 'absolute',
      right: '1rem'
    },
    '& .subfields p': {
      margin: '0',
      fontSize: Variables.fontSize.medium,
    },
  },
}));

export default function PaperWrapper(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      {props.children}
    </Paper>
  )
}
