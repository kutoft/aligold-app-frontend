import React from 'react';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbtack as faThumbtackSolid,
  faUserCircle,
  faPhone,
  faEnvelope,
  faMapMarker
} from '@fortawesome/pro-solid-svg-icons';

const useStyles = makeStyles(theme => ({
  subfields: {
    display: 'flex',
    alignItems: 'center',
    margin: '1rem -5px 0',
  },
  button: {
    width: '33.3333%',
    margin: '0 5px',
  }
}));

export default function ContactCard(props) {
  const classes = useStyles();
  const { item } = props;

  return (
    <>
      <Link
        to={`/edit/${item._id}`}
        state={{ type: 'contact' }}
        className="link"
      >
        {item.isPinned && (
          <p className="isPinned">
            <FontAwesomeIcon icon={faThumbtackSolid} />
          </p>
        )}
        <p className="type">{item.type}</p>
        <h3>{item.title}</h3>
      </Link>
      {item.fields.phones.length > 0 || item.fields.emails.length > 0 || item.fields.addresses.length > 0 && (
        <div className={`${classes.subfields} subfields`}>
          {item.fields.phones.length > 0 && (
            item.fields.phones.map(phone => {
              if (phone.isPrimary) {
                return (
                  <Button className={classes.button} variant="outlined" ><FontAwesomeIcon icon={faPhone} /></Button>
                )
              }
            })
          )}
          {item.fields.emails.length > 0 && (
            item.fields.emails.map(phone => {
              if (phone.isPrimary) {
                return (
                  <Button className={classes.button} variant="outlined" ><FontAwesomeIcon icon={faEnvelope} /></Button>
                )
              }
            })
          )}
          {item.fields.addresses.length > 0 && (
            item.fields.addresses.map(phone => {
              if (phone.isPrimary) {
                return (
                  <Button className={classes.button} variant="outlined" ><FontAwesomeIcon icon={faMapMarker} /></Button>
                )
              }
            })
          )}
        </div>
      )}
    </>
  );
}
