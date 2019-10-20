import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  collection: {
    margin: '7px 10px 1rem 0px',
    padding: '3px 3px 3px 10px',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'space-between',
    '& .radio': {
      width: '20px',
      height: '20px',
      backgroundColor: theme.palette.common.white,
      marginLeft: '7px',
      borderRadius: '0 20px 20px 0',
      position: 'relative',
    },
    '& .label': {
      lineHeight: '1',
      fontSize: '0.67rem',
      fontWeight: 'bold',
    },
    '&.active': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export default function CollectionFilter(props) {
  const classes = useStyles();
  const { collection, toggleCollection, index, collectionIndex } = props;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if(collectionIndex !== index) {
      setIsActive(false);
    }
  }, [collectionIndex]);

  return (
    <div
      key={collection._id}
      className={`${classes.collection} ${isActive ? 'active' : ''}`}
    >
      <span className="label" onClick={
        (id) => {
          toggleCollection(collection._id, index);
          setIsActive(!isActive);
        }
      }>{collection.title}</span>
      <Link
        to={`/edit/${collection._id}`}
        state={{ type: 'collection' }}
        className="radio"
      >
      </Link>
    </div>
  )
}
