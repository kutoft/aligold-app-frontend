import React, { useState, useEffect } from 'react';
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
  const {
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

  const [emailsState, setEmailsState] = useState(emails ? emails : [{...email}]);
  const [phonesState, setPhonesState] = useState(phones ? phones : [{...phone}]);
  const [addressesState, setAddressesState] = useState(addresses ? addresses : [{...address}]);


  function handleChange(e, type) {
    const value = e.target.value;
    const name = e.target.name;
    let obj = {};
    obj[name] = value;

    if(type === 'email') {
      setEmail(obj);
    }
    if(type === 'phone') {
      setPhone(obj);
    }
    if(type === 'address') {
      setAddress(obj);
    }
  }

  useEffect(() => {
    let currentEmails = emailsState;
    let newEmails = [];

    currentEmails.map((existingEmail, index) => {
      if(existingEmail.email === email.email) {
        newEmails[index] = email;
      } else {
        newEmails[index] = existingEmail;
      }
    });

    setEmailsState(newEmails);
  }, [email]);

  useEffect(() => {
    props.handleFieldsArrayChange(emailsState, 'emails')
  }, [emailsState]);

  useEffect(() => {
    let currentPhones = phonesState;
    let newPhones = [];

    currentPhones.map((existingPhone, index) => {
      if(existingPhone.number === phone.number) {
        newPhones[index] = phone;
      } else {
        newPhones[index] = existingPhone;
      }
    });

    setPhonesState(newPhones);
  }, [phones]);

  useEffect(() => {
    props.handleFieldsArrayChange(phonesState, 'phones')
  }, [phonesState]);

  useEffect(() => {
    let currentAddresses = addressesState;
    let newAddresses = [];

    currentAddresses.map((existingAddress, index) => {
      if(existingAddress.line1 === address.line1) {
        newAddresses[index] = address;
      } else {
        newAddresses[index] = existingAddress;
      }
    });

    setAddressesState(newAddresses);
  }, [address]);

  useEffect(() => {
    props.handleFieldsArrayChange(addressesState, 'addresses')
  }, [addressesState]);

  return (
    <>
      <div className={classes.flex}>
        <div className={classes.icon}>
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <div className={classes.fields}>
          <TextField
            id="email_email"
            name="email"
            label="Email"
            value={email.email}
            onChange={(e, type) => handleChange(e, 'email')}
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
            name="number"
            label="Phone"
            value={phone.number}
            onChange={e => props.handleFieldsArrayChange(e, 'phones')}
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
            name="line1"
            label="Address Line 1"
            value={address.line1}
            onChange={e => props.handleFieldsArrayChange(e, 'addresses')}
            fullWidth
            margin="dense"
            variant="outlined"
          />
          <TextField
            id="address_line2"
            name="line2"
            label="Address Line 2"
            value={address.line2}
            onChange={e => props.handleFieldsArrayChange(e, 'addresses')}
            margin="dense"
            fullWidth
            variant="outlined"
          />
          <div className={`${classes.flex} ${classes.marginNegative}`}>
            <TextField
              id="address_zip"
              name="zip"
              label="Zip"
              value={address.zip}
              onChange={e => props.handleFieldsArrayChange(e, 'addresses')}
              margin="dense"
              variant="outlined"
              className={classes.width_half}
            />
            <TextField
              id="address_city"
              name="city"
              label="City"
              value={address.city}
              onChange={e => props.handleFieldsArrayChange(e, 'addresses')}
              margin="dense"
              variant="outlined"
              className={classes.width_half}
            />
            <TextField
              id="address_state"
              name="state"
              label="State"
              value={address.state}
              onChange={e => props.handleFieldsArrayChange(e, 'addresses')}
              margin="dense"
              variant="outlined"
              className={classes.width_half}
            />
            <TextField
              id="address_country"
              name="country"
              label="Country"
              value={address.country}
              onChange={e => props.handleFieldsArrayChange(e, 'addresses')}
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
