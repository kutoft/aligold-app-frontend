import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function ContactFields(props) {
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
  let { isPrimary, firstName, middleName, lastName, occupation, salutation, emails, phones, addresses } = props.fields;

  return (
    <>
      {/*
      <FormControlLabel
        control={
          <Checkbox checked={isPrimary} name="isPrimary" value="isPrimary" onChange={(e) => props.handleFieldsChange(e)} />
        }
        label="Primary"
      />
      */}
      <TextField
        id="firstName"
        name="firstName"
        label="First Name"
        value={firstName}
        onChange={(e) => props.handleFieldsChange(e)}
        fullWidth
        margin="normal"
      />
      <TextField
        id="middleName"
        name="middleName"
        label="Middle Name"
        value={middleName}
        onChange={(e) => props.handleFieldsChange(e)}
        fullWidth
        margin="normal"
      />
      <TextField
        id="lastName"
        name="lastName"
        label="Last Name"
        value={lastName}
        onChange={(e) => props.handleFieldsChange(e)}
        fullWidth
        margin="normal"
      />
      <TextField
        id="occupation"
        name="occupation"
        label="Occupation"
        value={occupation}
        onChange={(e) => props.handleFieldsChange(e)}
        fullWidth
        margin="normal"
      />
      <TextField
        id="salutation"
        name="salutation"
        label="Salutation"
        value={salutation}
        onChange={(e) => props.handleFieldsChange(e)}
        fullWidth
        margin="normal"
      />
    </>
  )
}
