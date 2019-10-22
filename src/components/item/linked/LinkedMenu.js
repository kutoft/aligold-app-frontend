import React from 'react';
import { Link } from "@reach/router";
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/pro-solid-svg-icons';
import { Variables } from '../../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1rem',
    borderTop: '1px solid rgba(0,0,0,0.23)'
  },
  add: {
    display: 'flex',
    margin: '0 -0.5rem',
  },
  addButton: {
    width: '50%',
    margin: '0 0.5rem',
    fontSize: '0.75rem',
    textTransform: 'capitalize',
  },
  list: {
    listStyleType: 'none',
    margin: '1rem 0 0 0',
    padding: '0',
  },
  link: {
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid rgba(0,0,0,0.23)',
    borderRadius: '4px',
    '&:last-child': {
      marginBottom: '0',
    }
  },
  anchor: {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 8px',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: 'normal',
    margin: '0 0 15px',
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
  note: {
    maxHeight: '40px',
    overflow: 'hidden',
    '& *': {
      margin: '0',
      fontSize: Variables.fontSize.tiny,
    }
  },
  appointment: {
    display: 'flex',
    margin: '0 -0.5rem',
  },
  appointmentItem: {
    width: '50%',
    margin: '0 0.5rem',
    fontSize: Variables.fontSize.tiny,
  },
}));

export default function LinkedMenu(props) {
  const classes = useStyles();
  let { item, handleBool } = props;

  return (
    <div className={classes.root}>
      <div className={classes.add}>
        <Button
          variant="outlined"
          fullWidth
          color="primary"
          className={classes.addButton}
          onClick={() => handleBool('isLinkedModalOpen')}
        >
          Add Collection
        </Button>
        <Button
          variant="outlined"
          fullWidth
          color="primary"
          className={classes.addButton}
          onClick={() => handleBool('isLinkedModalOpen')}
        >
          Add Link
        </Button>
      </div>
      <ul className={classes.list}>
        {item.linked.length > 0 && (
          item.linked.map(link => (
            <li className={classes.link} key={link._id}>
              <Link className={classes.anchor} to={`/edit/${link._id}`} state={{ type: link.type }}>
                <h6 className={classes.type} >{link.type}</h6>
                <h4 className={classes.title} >{link.title}</h4>
                {link.type === 'appointment' && (
                  <div className={classes.appointment}>
                    <div className={classes.appointmentItem}>
                      <div>From:</div>
                      <div>{link.fields.date.startTime}</div>
                      <div>{link.fields.date.startDate}</div>
                    </div>
                    <div className={classes.appointmentItem}>
                      <div>To:</div>
                      <div>{link.fields.date.endTime}</div>
                      <div>{link.fields.date.endDate}</div>
                    </div>
                  </div>
                )}
                {link.type === 'note' && (
                  <div className={classes.note} dangerouslySetInnerHTML={{__html: link.fields.body}}></div>
                )}
                {link.type === 'reminder' && (
                  <div className={classes.reminder}>
                    <div>On:</div>
                    <div>{link.fields.date.startTime}</div>
                    <div>{link.fields.date.startDate}</div>
                  </div>
                )}
                {link.type === 'todo' && (
                  <p></p>
                )}
                {link.type === 'contact' && (
                  <div className={classes.appointment}>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      size="small"
                      className={classes.addButton}
                    >
                      Call
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      size="small"
                      className={classes.addButton}
                    >
                      Email
                    </Button>
                  </div>
                )}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
