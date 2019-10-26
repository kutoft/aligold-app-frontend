import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faMobileAndroid,
  faMapMarkerAlt,
} from '@fortawesome/pro-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
  },
  marginNegative: {
    flexWrap: 'wrap',
    marginLeft: '-0.5rem',
    marginRight: '-0.5rem',
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    width: '40px',
    minWidth: '40px',
    maxWidth: '40px',
    height: '40px',
    marginTop: '8px',
    marginBottom: '4px',
    color: theme.palette.grey[500],
    backgroundColor: theme.palette.grey[200],
    borderRadius: '4px',
  },
  fields: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: '1',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  width_half: {
    width: '50%',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  width_one_thirds: {
    width: '33.3333%',
  },
  width_two_thirds: {
    width: '66.6666%',
  },
}));

export default function ContactFields(props) {
  const classes = useStyles();
  const [email, setEmail] = useState({
    isPrimary: false,
    type: '',
    email: '',
  });
  const [phone, setPhone] = useState({
    isPrimary: false,
    type: '',
    number: '',
  });
  const [address, setAddress] = useState({
    isPrimary: false,
    type: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  let {
    isPrimary,
    firstName,
    middleName,
    lastName,
    occupation,
    salutation,
    emails,
    phones,
    addresses,
  } = props.fields;

  return (
    <>
      <div className={classes.flex}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className={classes.fields}>
          <TextField
            id="email_email"
            name="email_email"
            label="Email"
            value={email.email}
            onChange={e => props.handleFieldsChange(e, 'email')}
            fullWidth
            margin="dense"
            variant="outlined"
          />
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faMobileAndroid} />
        </div>
        <div className={classes.fields}>
          <TextField
            id="phone_number"
            name="phone_number"
            label="Phone"
            value={phone.number}
            onChange={e => props.handleFieldsChange(e, 'phone')}
            fullWidth
            margin="dense"
            variant="outlined"
          />
        </div>
      </div>
      <div className={classes.flex}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </div>
        <div className={classes.fields}>
          <TextField
            id="address_line1"
            name="address_line1"
            label="Address Line 1"
            value={address.line1}
            onChange={e => props.handleFieldsChange(e, 'address')}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            id="address_line2"
            name="address_line2"
            label="Address Line 2"
            value={address.line2}
            onChange={e => props.handleFieldsChange(e, 'address')}
            margin="dense"
            fullWidth
            variant="outlined"
          />
          <div className={`${classes.flex} ${classes.marginNegative}`}>
            <TextField
              id="address_zip"
              name="address_zip"
              label="Zip"
              value={address.zip}
              onChange={e => props.handleFieldsChange(e, 'address')}
              margin="dense"
              variant="outlined"
              className={classes.width_half}
            />
            <TextField
              id="address_city"
              name="address_city"
              label="City"
              value={address.city}
              onChange={e => props.handleFieldsChange(e, 'address')}
              margin="dense"
              variant="outlined"
              className={classes.width_half}
            />
            <TextField
              id="address_state"
              name="address_state"
              label="State"
              value={address.state}
              onChange={e => props.handleFieldsChange(e, 'address')}
              margin="dense"
              variant="outlined"
              className={classes.width_half}
            />
            <TextField
              id="address_country"
              name="address_country"
              label="Country"
              value={address.country}
              onChange={e => props.handleFieldsChange(e, 'address')}
              margin="dense"
              variant="outlined"
              className={classes.width_half}
            />
          </div>
        </div>
      </div>
    </>
  );
}
