import React from 'react';
import { Link } from "@reach/router";
import Card from './Card';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid } from '@fortawesome/pro-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.secondary.dark,
  },
}));

export default function DefaultCard(props) {
  const classes = useStyles();
  return (
    <Card>
      <Link to={`/edit/${props.item._id}`} className={classes.link}>
        <Paper>
          {props.item.isPinned && (
            <p className="isPinned">
              <FontAwesomeIcon icon={faThumbtackSolid} />
            </p>
          )}
          <p>{props.item.type.toUpperCase()}</p>
          <h3>{props.item.title}</h3>
        </Paper>
      </Link>
    </Card>
  )
};
