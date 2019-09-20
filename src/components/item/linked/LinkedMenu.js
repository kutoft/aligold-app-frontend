import React from 'react';
import { Link } from "@reach/router";
import { Variables } from '../../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/pro-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    height: '100%',
    width: '100%',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'stretch'
  },
  list: {
    width: '40%',
    minWidth: '40%',
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid rgba(0,0,0,0.2)'
  },
  link: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 1rem',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 'normal',
    margin: '0',
    overflow: 'hidden',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  type: {
    fontSize: Variables.fontSize.tiny,
    fontWeight: 'normal',
    margin: '0',
    overflow: 'hidden',
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  add: {
    width: '65px',
    minWidth: '65px',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'sticky',
    left: '0',
    background: Variables.colors.white,
    zIndex: '1',
  }
}));

export default function LinkedMenu(props) {
  const classes = useStyles();
  let { item, handleBool } = props;

  return (
    <ul className={classes.root}>
      <li className={`${classes.list} ${classes.add}`} onClick={() => handleBool('isLinkedModalOpen')}>
        <FontAwesomeIcon icon={faPlusSquare} />
      </li>
      {item.linked.length > 0 && (
        item.linked.map(link => (
          <li className={classes.list} key={link._id}>
            <Link className={classes.link} to={`/collections/${link.collectionId}/${link.type}/${link._id}`}>
              <h6 className={classes.type} >{link.type}</h6>
              <h4 className={classes.title} >{link.title}</h4>
            </Link>
          </li>
        ))
      )}
    </ul>
  )
}
