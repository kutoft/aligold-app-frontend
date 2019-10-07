import React from 'react';
import { Link } from "@reach/router";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid, faUserCircle } from '@fortawesome/pro-solid-svg-icons';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 -0.5rem',
    '& > div': {
      padding: '0 0.5rem',
    }
  },
  avatar: {
    fontSize: '2.5rem',
    lineHeight: '0',
  },

});

export default function ContactCard(props) {
  const classes = useStyles();

  return (
    <li>
      <Link to={`edit/${props.item._id}`} state={{ type: 'contact' }}>
      <Paper>
        {props.item.isPinned && (
          <p className="isPinned">
            <FontAwesomeIcon icon={faThumbtackSolid} />
          </p>
        )}
        <div className={classes.list}>
          <div className={classes.avatar}>
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <div className="">
            <p>{props.item.fields.occupation.toUpperCase()}</p>
            <h3>{props.item.fields.firstName} {props.item.fields.lastName}</h3>
          </div>
        </div>
      </Paper>
      </Link>
    </li>
  )
};
