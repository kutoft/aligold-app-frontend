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

export default function NoteCard(props) {
  const classes = useStyles();

  return (
    <Link
      to={`/edit/${props.item._id}`}
      state={{ type: 'note' }}
      className={classes.link}
    >
      {props.item.isPinned && (
        <p className="isPinned">
          <FontAwesomeIcon icon={faThumbtackSolid} />
        </p>
      )}
      <p>{props.item.type.toUpperCase()}</p>
      <h3>{props.item.title}</h3>
    </Link>
  );
}
