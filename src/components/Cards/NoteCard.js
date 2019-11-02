import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid } from '@fortawesome/pro-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  noteBody: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    maxHeight: '36px',
  },
}));

export default function NoteCard(props) {
  const classes = useStyles();
  const { item } = props;

  function getBodyHtml() {
    return item.fields.body
  }

  return (
    <Link
      to={`/edit/${item._id}`}
      state={{ type: 'note' }}
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
        <div className={classes.noteBody} dangerouslySetInnerHTML={{__html: getBodyHtml()}}></div>
      </div>
    </Link>
  );
}
