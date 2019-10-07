import React, { useState } from 'react';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  collection: {
    margin: '15px 10px 15px 0px',
    padding: '7px 15px 7px 10px',
    border: `1px solid ${Variables.colors.white}`,
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    '& .radio': {
      width: '15px',
      height: '15px',
      backgroundColor: Variables.colors.white,
      marginRight: '7px',
      borderRadius: '50%',
      position: 'relative',
    },
    '& .label': {
      textTransform: 'uppercase',
      lineHeight: '1',
      fontSize: Variables.fontSize.small,
    },
    '&.active': {
      borderColor: Variables.colors.primary,
      '& .radio': {
        backgroundColor: Variables.colors.primary,
        '&:after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '7px',
          height: '7px',
          borderRadius: '50%',
          backgroundColor: Variables.colors.white,
        }
      }
    },
  },
});

export default function CollectionFilter(props) {
  const classes = useStyles();
  const { collection, toggleCollection } = props;
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      key={collection._id}
      className={`${classes.collection} ${isActive ? 'active' : ''}`}
      onClick={
        (id) => {
          toggleCollection(collection._id);
          setIsActive(!isActive);
        }
      }
    >
      <span className="radio"></span>
      <span className="label">{collection.title}</span>
    </div>
  )
}
