import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import logo from '../images/aligold-logo-icon.png';
import { Variables } from '../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100vh',
    padding: '6rem 2rem 2rem',
  },
  link: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    textTransform: 'uppercase',
  },
  header: {
    width: '100%',
    textAlign: 'center',
  },
  avatar: {
    margin: `${theme.spacing(1)}px auto`,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    display: 'none',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '&.open': {
      display: 'block',
    }
  },
  formSubLinks: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '0.875rem',
  },
  footer: {
    width: '100%',
    '&.open': {
      display: 'none',
    }
  },
  button: {
    display: 'block',
    backgroundColor: Variables.colors.primary,
    color: Variables.colors.white,
    padding: '6px 16px',
    fontSize: '0.875rem',
    textAlign: 'center',
    minWidth: '64px',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: '500',
    lineHeight: '1.75',
    borderRadius: '4px',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    border: '2px solid transparent',
    borderBottomColor: Variables.colors.primaryDark,
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: Variables.colors.primaryDark,
      borderBottomColor: Variables.colors.primaryLight,
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    width: '90%',
  }
}));

export default function Login(props) {
  const classes = useStyles();
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [emailFormOpen, setEmailFormOpen] = useState();

  // Retrieve email/password object from the login/signup page
  const getCredentials = () => {
    const user = {
      email: email,
      password: password
    };
    return user;
  };

  useEffect(() => {
    if(props.auth.error) {
      setErrorEmail(true);
      setErrorMessage(props.auth.errorMessage);
    }
  }, [props.auth.error, props.auth.errorMessage]);

  function handleClick() {
    if(password !== passwordRepeat) {
      setErrorPassword(true);
      setErrorMessage('Passwords must match.');
      return;
    }
    const user = getCredentials();
    props.auth.register(user);
  }

  return (
    <div className={classes.container}>

      <Link to="/login" className={classes.link} >Login</Link>

      <div className={classes.header}>
        <Avatar className={classes.avatar}>
          <img src={logo} alt="AliGold" className={classes.img} />
        </Avatar>
        <Typography component="h1" variant="h5">
          AliGold Care
        </Typography>
      </div>

      <div className={`${classes.form}${emailFormOpen ? ' open' : ''}`}>
        <TextField
          error={errorEmail}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          margin="dense"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          error={errorPassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          margin="dense"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          error={errorPassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password-repeat"
          label="Password Repeat"
          type="password"
          id="password"
          autoComplete="current-password"
          margin="dense"
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => handleClick()}
        >
          Sign Up
        </Button>
        <div>
          <div className={classes.formSubLinks}>
            <div onClick={() => setEmailFormOpen(!emailFormOpen)}>
              Back
            </div>
          </div>
          {errorEmail || errorPassword && (
            <p className="error">{errorMessage}</p>
          )}
        </div>
      </div>

      <div className={`${classes.footer}${emailFormOpen ? ' open' : ''}`}>
        <a className={`${classes.button} secondary`} href={`${process.env.REACT_APP_BASE_URL}/oauth/google`}>Sign up with Google</a>
        <button
          type="submit"
          className={`${classes.button} primary ${classes.submit}`}
          onClick={() => setEmailFormOpen(!emailFormOpen)}
        >
          Sign up with Email
        </button>
      </div>
    </div>
  );
}
