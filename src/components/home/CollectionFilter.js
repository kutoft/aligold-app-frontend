import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
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
      width: '30px',
      height: '30px',
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.common.white,
      marginLeft: '7px',
      borderRadius: '0 20px 20px 0',
      position: 'relative',
    },
    '& .label': {
      lineHeight: '1',
      fontSize: '0.67rem',
      fontWeight: 'bold',
      padding: '0 5px',
    },
    '&.active': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main,
    },
  },
  icon: {
    position: 'relative',
    left: '11px',
    top: '5px',
    fontSize: '0.75rem',
  },
}));

export default function CollectionFilter(props) {
  const classes = useStyles();
  const { collection, toggleCollection, index, collectionIndex, collectionId } = props;
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (collectionIndex !== index) {
      setIsActive(false);
    }
  }, [collectionIndex]);

  useEffect(() => {
    if(collectionId === collection._id) {
      setIsActive(true);
    }
  }, [collectionId]);

  return (
    <div
      key={collection._id}
      className={`${classes.collection} ${isActive ? 'active' : ''}`}
    >
      <span
        className="label"
        onClick={id => {
          toggleCollection(collection._id, index);
          setIsActive(!isActive);
        }}
      >
        {collection.title}
      </span>
      <Link
        to={`/edit/${collection._id}`}
        state={{ type: 'collection' }}
        className="radio"
      >
        <FontAwesomeIcon icon={faEllipsisV} className={classes.icon} />
      </Link>
    </div>
  );
}
