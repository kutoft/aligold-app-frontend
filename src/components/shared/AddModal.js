import React from 'react';
import { Link } from "@reach/router";
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLayerGroup, faCalendarPlus, faFilePlus, faAlarmPlus, faClipboardListCheck, faUserPlus } from '@fortawesome/pro-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    width: '0',
    height: '0',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: `linear-gradient(140deg, ${theme.palette.secondary.dark} 15%, ${theme.palette.secondary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
    '& .add': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '1',
      bottom: '-12.5px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      width: '75px',
      height: '75px',
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '50%',
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.common.white,
      boxShadow: '0px 5px 5px -3px rgba(255,255,255,0.2), 0px 8px 10px 1px rgba(255,255,255,0.14), 0px 3px 14px 2px rgba(255,255,255,0.12)',
    },
    '&.active': {
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: '100',
      '& .add': {
        position: 'absolute',
      }
    }
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: '6rem 4rem',
    overflow: 'auto',
    color: 'inherit',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    width: '100%',
    padding: '15px 25px',
    marginBottom: '1rem',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50px',
    '&.mb0': {
      marginBottom: '0',
    },
  },
  icon: {
    marginRight: '7px',
  },
  hr: {
    margin: '3rem 0',
    width: '100%',
  }
}));

export default function AddModal(props) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${props.addModal ? 'active' : ''}`}>
      <div className={classes.body} >
        <Link className={`${classes.link} mb0`} to="/new" state={{ type: 'collection' }} onClick={() => props.setAddModal(!props.addModal)} >
          <FontAwesomeIcon icon={faLayerGroup} className={classes.icon} />
          <span className={classes.label}>Collection</span>
        </Link>
        <hr className={classes.hr} />
        <Link className={classes.link} to="/new" state={{ type: 'appointment' }} onClick={() => props.setAddModal(!props.addModal)} >
          <FontAwesomeIcon icon={faCalendarPlus} className={classes.icon} />
          <span className={classes.label}>Event</span>
        </Link>
        <Link className={classes.link} to="/new" state={{ type: 'reminder' }} onClick={() => props.setAddModal(!props.addModal)}>
          <FontAwesomeIcon icon={faAlarmPlus} className={classes.icon} />
          <span className={classes.label}>Reminder</span>
        </Link>
        <Link className={classes.link} to="/new" state={{ type: 'note' }} onClick={() => props.setAddModal(!props.addModal)} >
          <FontAwesomeIcon icon={faFilePlus} className={classes.icon} />
          <span className={classes.label}>Note</span>
        </Link>
        {/*
        <Link className={classes.link} to="todo/new">
          <FontAwesomeIcon icon={faClipboardListCheck} className={classes.icon} />
          <span className={classes.label}>ToDo</span>
        </Link>
        */}
        <Link className={`${classes.link} mb0`} to="/new" state={{ type: 'contact' }} onClick={() => props.setAddModal(!props.addModal)} >
          <FontAwesomeIcon icon={faUserPlus} className={classes.icon} />
          <span className={classes.label}>Contact</span>
        </Link>
      </div>
      <div className="add" onClick={() => props.setAddModal(!props.addModal)} >
        <FontAwesomeIcon icon={faTimes} />
      </div>
    </div>
  )
}
