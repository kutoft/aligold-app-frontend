import React from 'react';
import { Link } from "@reach/router";
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faUserCircle, faTasksAlt, faLayerGroup, faPlus } from '@fortawesome/pro-solid-svg-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    width: '100%',
    overflow: 'auto',
    color: 'inherit',
  },
  link: {
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: Variables.fontSize.tiny,
    backgroundColor: Variables.colors.white,
    color: Variables.colors.dark,
    '&[aria-current]': {
      backgroundColor: Variables.colors.light,
      '&:after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: '3px',
        top: '0',
        left: '0',
        backgroundColor: Variables.colors.white,
      }
    },
    '&:first-child': {
      paddingRight: '35px',
    },
    '&:last-child': {
      paddingLeft: '35px',
    },
  },
  icon: {
    fontSize: Variables.fontSize.xLarge,
    marginBottom: '3px',
  },
  add: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: '1',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75px',
    height: '75px',
    border: `2px solid ${Variables.colors.medium}`,
    borderRadius: '50%',
    backgroundColor: Variables.colors.white,
  },
});

export default function NavigationButtom(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link className={classes.link} to="/" onClick={() => props.setMainNav('home')}>
        <FontAwesomeIcon icon={faLayerGroup} className={classes.icon} />
        <span className={classes.label}>Home</span>
      </Link>
      <div className={classes.add} onClick={() => props.setAddModal(!props.addModal)} >
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <Link className={classes.link} to="/account" onClick={() => props.setMainNav('account')}>
        <FontAwesomeIcon icon={faUserCircle} className={classes.icon} />
        <span className={classes.label}>Account</span>
      </Link>
    </div>
  );
}