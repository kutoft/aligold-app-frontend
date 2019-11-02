import React from 'react';
import AppointmentCard from './AppointmentCard';
import NoteCard from './NoteCard';
import ContactCard from './ContactCard';
import ReminderCard from './ReminderCard';
import TodoCard from './TodoCard';
import { Card as MuiCard } from '@material-ui/core';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 0 0.75rem',
    listStyleType: 'none',
    padding: '10px',
    border: `1px solid ${theme.palette.grey[200]}`,
    backgroundColor: theme.palette.common.white,
    boxShadow: '0px 2px 0px -3px rgba(0,0,0,0.2), 0px 5px 6px -2px rgba(0,0,0,0.14), 0px 3px 14px -2px rgba(0,0,0,0.12)',
    '& a': {
      textDecoration: 'none',
    },
    '& .link': {
      display: 'block',
      color: theme.palette.secondary.dark,
      position: 'relative',
    },
    '& p': {
      margin: '0',
      fontSize: '0.675rem',
    },
    '& h3': {
      margin: '0 0 7px',
      textTransform: 'Capitalize',
    },
    '& .isPinned': {
      position: 'absolute',
      top: '0',
      right: '0',
      color: theme.palette.primary.main,
    },
    '& .type': {
      fontSize: '0.55rem',
      fontWeight: 'bold',
      marginBottom: '3px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    '& .subfields': {
      marginTop: '1rem',
    }
  },
}));

export default function Card(props) {
  const { item } = props;
  const classes = useStyles();

  return (
    <MuiCard component="li" className={classes.root}>
      {item.type === 'appointment' && <AppointmentCard item={item} />}
      {item.type === 'note' && <NoteCard item={item} />}
      {item.type === 'reminder' && <ReminderCard item={item} />}
      {item.type === 'todo' && <TodoCard item={item} />}
      {item.type === 'contact' && <ContactCard item={item} />}
    </MuiCard>
  );
}
