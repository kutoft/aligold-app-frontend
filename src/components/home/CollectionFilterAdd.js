import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  collection: {
    margin: '7px 10px 1rem 0px',
    padding: '7px 14px',
    width: '40px',
    height: '40px',
    border: `2px solid ${theme.palette.common.white}`,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.common.white,
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    '& .label': {
      lineHeight: '1',
      fontSize: '0.67rem',
      fontWeight: 'bold',
    },
  },
}));

export default function CollectionFilterAdd(props) {
  const classes = useStyles();

  return (
    <Link
      to="/new"
      state={{ type: 'collection' }}
      className={classes.collection}
    >
      <span className="label">
        <FontAwesomeIcon icon={faPlus} />
      </span>
    </Link>
  );
}
