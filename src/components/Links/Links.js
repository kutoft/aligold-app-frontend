import React, { useState } from 'react';
import { Link } from '@reach/router';
import Cards from '../Cards/';
import Button from '@material-ui/core/Button';
import LinkedModal from './LinkedModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/pro-solid-svg-icons';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '1rem',
    borderTop: '1px solid rgba(0,0,0,0.23)',
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
    borderRadius: '30px',
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
    },
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
    },
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
  let { item, handleLinkedChange, updateItem } = props;
  const [isLinkedModalOpen, setIsLinkedModalOpen] = useState(false);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.add}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.addButton}
            onClick={() => setIsLinkedModalOpen('isLinkedModalOpen')}
          >
            Add Collection
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            className={classes.addButton}
            onClick={() => setIsLinkedModalOpen('isLinkedModalOpen')}
          >
            Add Link
          </Button>
        </div>
        <ul className={classes.list}>
          {item.linked.length > 0 &&
            item.linked.map(link => <Cards key={link._id} item={link} />)}
        </ul>
      </div>
      {isLinkedModalOpen && (
        <LinkedModal
          isLinkedModalOpen={isLinkedModalOpen}
          setIsLinkedModalOpen={setIsLinkedModalOpen}
          handleLinkedChange={handleLinkedChange}
          updateItem={updateItem}
          linked={item.linked}
          _id={item._id}
        />
      )}
    </>
  );
}
