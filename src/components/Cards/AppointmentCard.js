import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid } from '@fortawesome/pro-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    color: theme.palette.secondary.dark,
    position: 'relative',
  },
}));

export default function AppointmentCard(props) {
  const classes = useStyles();
  const { item } = props;

  return (
    <Link
      to={`/edit/${item._id}`}
      state={{ type: 'appointment' }}
      className="link"
    >
      {item.isPinned && (
        <p className="isPinned">
          <FontAwesomeIcon icon={faThumbtackSolid} />
        </p>
      )}
      <p className="type">{item.type}</p>
      <h3>{item.title}</h3>
      <div className="subfields flex-list-h">
        <p>{item.fields.date.startTime}</p>
        <p>{item.fields.date.startDate}</p>
      </div>
    </Link>
  );
}
