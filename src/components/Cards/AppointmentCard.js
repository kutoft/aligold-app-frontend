import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid } from '@fortawesome/pro-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    color: theme.palette.secondary.dark,
  },
}));

export default function AppointmentCard(props) {
  const classes = useStyles();

  return (
    <Link
      to={`/edit/${props.item._id}`}
      state={{ type: 'appointment' }}
      className={classes.link}
    >
      {props.item.isPinned && (
        <p className="isPinned">
          <FontAwesomeIcon icon={faThumbtackSolid} />
        </p>
      )}
      <p>{props.item.type.toUpperCase()}</p>
      <h3>{props.item.title}</h3>
      <div className="subfields flex-list-h" style={{ marginTop: '1rem' }}>
        <p>{props.item.fields.date.startTime}</p>
        <p>{props.item.fields.date.startDate}</p>
      </div>
    </Link>
  );
}
