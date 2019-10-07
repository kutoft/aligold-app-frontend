import React from 'react';
import { Link } from "@reach/router";
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid } from '@fortawesome/pro-solid-svg-icons';

export default function AppointmentCard(props) {

  return (
    <li>
      <Link to={`edit/${props.item._id}`} state={{ type: 'appointment' }}>
        <Paper>
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
        </Paper>
      </Link>
    </li>
  )
};
