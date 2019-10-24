import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { useAuth } from '../../../context/AuthContext';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Icon } from '../../../images/Icon';
import { Variables } from '../../../constants/Variables';
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
    backgroundColor: theme.palette.secondary.main,
    backgroundImage: `linear-gradient(140deg, ${theme.palette.secondary.dark} 15%, ${theme.palette.secondary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
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
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: '50px',
  },
  name: {
    color: theme.palette.common.white,
    fontSize: '1.25rem',
    fontWeight: 'normal',
    marginTop: '5px',
    '& .bold': {
      fontWeight: 'bold',
    },
  },
  form: {
    display: 'none',
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    '&.open': {
      display: 'block',
    },
  },
  formSubLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875rem',
  },
  footer: {
    width: '100%',
    '&.open': {
      display: 'none',
    },
  },
  button: {
    display: 'block',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.dark,
    padding: '6px 16px',
    fontSize: '0.875rem',
    textAlign: 'center',
    minWidth: '64px',
    width: '100%',
    boxSizing: 'border-box',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: '500',
    lineHeight: '1.75',
    borderRadius: '4px',
    letterSpacing: '0.02857em',
    textTransform: 'uppercase',
    border: '2px solid transparent',
    borderBottomColor: theme.palette.primary.main,
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderBottomColor: theme.palette.common.white,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailFormOpen, setEmailFormOpen] = useState();
  const auth = useAuth();
  const [accessToken, setAccessToken] = useState(
    props.location.hash.split('=')[1]
  );

  // Retrieve email/password object from the login/signup page
  const getCredentials = () => {
    const user = {
      email: email,
      password: password,
    };
    return user;
  };

  function handleClick() {
    const user = getCredentials();
    auth.login(user);
  }

  useEffect(() => {
    auth.login();
  }, [accessToken]);

  return (
    <div className={classes.container}>
      {/*
      <Link to="/signup" className={classes.link} >Sign Up</Link>
      */}

      <div className={classes.header}>
        <div className={classes.logo}>
          <div className={classes.img}>
            <Icon color="white" />
          </div>
          <div>
            <h4 className={classes.name}>
              BRAIN<span className="bold">BASIN</span>
            </h4>
          </div>
        </div>
      </div>

      {/*
      <div className={`${classes.form}${emailFormOpen ? ' open' : ''}`}>
        <TextField
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => handleClick()}
        >
          Login
        </Button>
        <div>
          <div className={classes.formSubLinks}>
            <Link to="/forgot-password">
              Forgot password?
            </Link>
            <div onClick={() => setEmailFormOpen(!emailFormOpen)}>
              Back
            </div>
          </div>
          {error && (
            <p className="error">{error.data.message}</p>
          )}
        </div>
      </div>
      */}

      <div className={`${classes.footer}${emailFormOpen ? ' open' : ''}`}>
        <a
          className={`${classes.button} white`}
          href={`${process.env.REACT_APP_BASE_URL}/oauth/google`}
        >
          Login with Google
        </a>
        {/*
          <button
          type="submit"
          className={`${classes.button} primary ${classes.submit}`}
          onClick={() => setEmailFormOpen(!emailFormOpen)}
        >
          Login with Email
        </button>
        */}
      </div>
    </div>
  );
}
