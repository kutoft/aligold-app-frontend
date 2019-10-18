import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '-webkit-fill-available',
  },
  loader: {
    maxWidth: '25em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));

export default function FullPageSpinner(props) {
  const classes = useStyles();
  const { icon, message } = props;

  return (
    <div className={classes.root}>
      <div className={classes.loader}>
        <FontAwesomeIcon icon={faSpinner} />
        <span>{message}</span>
      </div>
    </div>
  );
}

FullPageSpinner.defaultProps = {
  icon: {},
  message: 'Loading...',
};

FullPageSpinner.propTypes = {
  icon: PropTypes.object,
  message: PropTypes.string,
};
