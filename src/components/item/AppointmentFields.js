import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  date: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '0 -0.25rem',
  },
  dateTextField: {
    width: '50%',
    padding: '0 0.5rem',
  },
});

export default function AppointmentFields(props) {
  let { date, location, repeat } = props.fields;
  const classes = useStyles();

  if(date === undefined) {
    date = {
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    };
  };
  if(repeat === undefined) {
    repeat = {
      isActive: false,
      amount: '',
      type: '',
      startOnDays: [],
      endType: '',
      endDate: '',
    };
  };

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
        <TextField
          id="date_endDate"
          name="endDate"
          label="End Date"
          type="date"
          value={date.endDate}
          onChange={(e, level1) => props.handleFieldsChange(e, 'date')}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          className={classes.dateTextField}
        />
        <TextField
          id="date_endTime"
          name="endTime"
          label="End Time"
          type="time"
          value={date.endTime}
          onChange={(e, level1) => props.handleFieldsChange(e, 'date')}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          className={classes.dateTextField}
        />
      </div>
      <TextField
        id="location"
        name="location"
        label="Location"
        value={location}
        onChange={(e) => props.handleFieldsChange(e)}
        fullWidth
        margin="normal"
      />
      <div className="repeat">
        <FormControlLabel
          control={
            <Checkbox checked={repeat.isActive} name="isActive" value="isActive" onChange={(e) => props.handleFieldsChange(e, 'repeat')} />
          }
          label="Repeat"
        />
        {repeat.isActive && (
          <>
            <TextField
              id="repeat_amount"
              name="amount"
              label="Amount"
              type="number"
              value={repeat.amount}
              onChange={(e, level1) => props.handleFieldsChange(e, 'repeat')}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <div>
              <input name="type" value={repeat.type} onChange={(e) => props.handleFieldsChange(e, 'repeat')} />
            </div>
            <div>
              <input name="startOnDays" value={repeat.startOnDays} onChange={(e) => props.handleFieldsChange(e, 'repeat')} />
            </div>
            <div>
              <input name="endType" value={repeat.endType} onChange={(e) => props.handleFieldsChange(e, 'repeat')} />
            </div>
            <div>
              <input name="endDate" value={repeat.endDate} onChange={(e) => props.handleFieldsChange(e, 'repeat')} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
