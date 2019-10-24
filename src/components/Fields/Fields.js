import React from 'react';
import AppointmentFields from './AppointmentFields';
import NoteFields from './NoteFields';
import ContactFields from './ContactFields';
import ReminderFields from './ReminderFields';
import TodoFields from './TodoFields';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {},
});

export default function Fields(props) {
  const { item, type, handleFieldsChange, handleEditorChange } = props;
  const classes = useStyles();

  return (
    <>
      {type === 'appointment' && (
        <AppointmentFields
          fields={item.fields}
          handleFieldsChange={handleFieldsChange}
        />
      )}
      {type === 'note' && (
        <NoteFields
          fields={item.fields}
          handleFieldsChange={handleFieldsChange}
          handleEditorChange={handleEditorChange}
        />
      )}
      {type === 'reminder' && (
        <ReminderFields
          fields={item.fields}
          handleFieldsChange={handleFieldsChange}
        />
      )}
      {type === 'todo' && (
        <TodoFields
          fields={item.fields}
          handleFieldsChange={handleFieldsChange}
        />
      )}
      {type === 'contact' && (
        <ContactFields
          fields={item.fields}
          handleFieldsChange={handleFieldsChange}
        />
      )}
    </>
  );
}
