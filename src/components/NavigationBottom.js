import React from 'react';
import { Link } from "@reach/router";
import { Variables } from '../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faUserCircle, faTasksAlt, faLayerGroup } from '@fortawesome/pro-solid-svg-icons';

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
    backgroundColor: Variables.colors.primaryDark,
    color: Variables.colors.primaryLight,
    '&[aria-current]': {
      backgroundColor: Variables.colors.secondaryLight,
      color: Variables.colors.primaryDark,
    },
  },
  icon: {
    fontSize: Variables.fontSize.xLarge,
    marginBottom: '3px',
  }
});

export default function NavigationButtom(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Link className={classes.link} to="/collections">
        <FontAwesomeIcon icon={faLayerGroup} className={classes.icon} />
        <span className={classes.label}>Collections</span>
      </Link>
      <Link className={classes.link} to="/stream">
        <FontAwesomeIcon icon={faTasksAlt} className={classes.icon} />
        <span className={classes.label}>Stream</span>
      </Link>
      <Link className={classes.link} to="/contacts">
        <FontAwesomeIcon icon={faAddressBook} className={classes.icon} />
        <span className={classes.label}>Contacts</span>
      </Link>
      {/*<Link className={classes.link} to="/calendar">
        <FontAwesomeIcon icon={faCalendarAlt} className={classes.icon} />
        <span className={classes.label}>Calendar</span>
      </Link>*/}
      <Link className={classes.link} to="/account">
        <FontAwesomeIcon icon={faUserCircle} className={classes.icon} />
        <span className={classes.label}>Account</span>
      </Link>
    </div>
  );
}
