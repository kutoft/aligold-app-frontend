import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  date: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -0.5rem',
  },
  dateTextField: {
    width: '50%',
    padding: '0 0.5rem',
  },
});

export default function ReminderFields(props) {
  const classes = useStyles();
  let { date, notes } = props.fields;
  
  if(date === undefined) {
    date = {
      startDate: '',
      startTime: '',
    };
  };
  if(notes === undefined) { notes = ''; };

  return (
    <>
      <div className={classes.date}>
        <TextField
          id="date_startDate"
          name="startDate"
          label="Start Date"
          type="date"
          value={date.startDate}
          onChange={(e, level1) => props.handleFieldsChange(e, 'date')}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          className={classes.dateTextField}
        />
        <TextField
          id="date_startTime"
          name="startTime"
          label="Start Time"
          type="time"
          value={date.startTime}
          onChange={(e, level1) => props.handleFieldsChange(e, 'date')}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          className={classes.dateTextField}
        />
      </div>
      <div>
        <TextField
          id="notes"
          name="notes"
          label="Notes"
          value={notes}
          onChange={(e) => props.handleFieldsChange(e)}
          multiline
          rows="4"
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </div>
    </>
  )
}
