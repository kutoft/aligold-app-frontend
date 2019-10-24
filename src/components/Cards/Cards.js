import React from 'react';
import AppointmentCard from './AppointmentCard';
import NoteCard from './NoteCard';
import ContactCard from './ContactCard';
import ReminderCard from './ReminderCard';
import TodoCard from './TodoCard';
import Paper from '@material-ui/core/Paper';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '0 0 0.75rem',
    listStyleType: 'none',
    padding: '10px',
    '& a': {
      textDecoration: 'none',
    },
    '& p': {
      margin: '0',
      fontSize: Variables.fontSize.tiny,
    },
    '& h3': {
      margin: '0 0 7px',
      textTransform: 'Capitalize',
    },
  },
});

export default function Card(props) {
  const { item } = props;
  const classes = useStyles();

  return (
    <Paper component="li" className={classes.root}>
      {item.type === 'appointment' && <AppointmentCard item={item} />}
      {item.type === 'note' && <NoteCard item={item} />}
      {item.type === 'reminder' && <ReminderCard item={item} />}
      {item.type === 'todo' && <TodoCard item={item} />}
      {item.type === 'contact' && <ContactCard item={item} />}
    </Paper>
  );
}
