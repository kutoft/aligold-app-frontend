import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid } from '@fortawesome/pro-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
}));

export default function TodoCard(props) {
  const classes = useStyles();
  const { item } = props;
  return (
    <Link to={`/edit/${item._id}`} className="link">
      {item.isPinned && (
        <p className="isPinned">
          <FontAwesomeIcon icon={faThumbtackSolid} />
        </p>
      )}
      <p className="type">{item.type}</p>
      <h3>{item.title}</h3>
    </Link>
  );
}
