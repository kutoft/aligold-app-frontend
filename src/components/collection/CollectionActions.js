import React from 'react';
import { Link } from "@reach/router";
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarPlus, faFilePlus, faAlarmPlus, faClipboardListCheck, faUserPlus } from '@fortawesome/pro-solid-svg-icons';

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
    fontSize: '0.75rem',
    backgroundColor: Variables.colors.primaryDark,
    color: Variables.colors.secondaryLight,
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
      <Link className={classes.link} to="appointment/new">
        <FontAwesomeIcon icon={faCalendarPlus} className={classes.icon} />
        <span className={classes.label}>Event</span>
      </Link>
      <Link className={classes.link} to="note/new">
        <FontAwesomeIcon icon={faFilePlus} className={classes.icon} />
        <span className={classes.label}>Note</span>
      </Link>
      {/*
      <Link className={classes.link} to="reminder/new">
        <FontAwesomeIcon icon={faAlarmPlus} className={classes.icon} />
        <span className={classes.label}>Reminder</span>
      </Link>
      <Link className={classes.link} to="todo/new">
        <FontAwesomeIcon icon={faClipboardListCheck} className={classes.icon} />
        <span className={classes.label}>ToDo</span>
      </Link>
      */}
      <Link className={classes.link} to="contact/new">
        <FontAwesomeIcon icon={faUserPlus} className={classes.icon} />
        <span className={classes.label}>Contact</span>
      </Link>
    </div>
  );
}
