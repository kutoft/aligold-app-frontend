import React from 'react';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '0',
    listStyleType: 'none',
    paddingBottom: '0.75rem',
    '& p': {
      margin: '0',
      fontSize: Variables.fontSize.tiny,
    },
    '& h3': {
      margin: '0 0 7px',
      textTransform: 'Capitalize',
    }
  }
});

export default function Card(props) {
  const classes = useStyles();

  return (
    <li className={classes.root}>
      {props.children}
    </li>
  )
}
