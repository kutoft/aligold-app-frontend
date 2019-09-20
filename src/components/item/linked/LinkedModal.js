import React, { useState, useEffect } from 'react';
import Feathers from '../../../components/Feathers';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LinkedModal(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState({ "collectionId": props.collectionId, "$sort": { "meta.updatedDate": "-1" } });
  const [checked, setChecked] = useState([]);
  let { isLinkedModalOpen, handleBool, handleLinkedChange, updateItem, linked, _id } = props;

  const handleToggle = item => () => {
    const hasId = checked.filter(check => (check._id === item._id));
    let newChecked = [...checked];

    if (hasId.length === 0) {
      newChecked.push(item);
    } else {
      newChecked = checked.filter(check => (check._id !== item._id));
    }

    setChecked(newChecked);
    handleLinkedChange(newChecked);
  };

  function getItems() {
    Feathers.service('items').find({ query: query })
      .then(response => {
        setItems(response);
        console.log(response);
        setChecked(linked);
      })
      .catch(error => setError(error));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(error) {
    return null
  } else {
    return (
      <Dialog fullScreen open={isLinkedModalOpen} onClose={() => handleBool('isLinkedModalOpen')} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            {/*TODO: on close dont save state. reset back to initially loaded linked items*/}
            <IconButton edge="start" color="inherit" onClick={() => handleBool('isLinkedModalOpen')} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Linked Items
            </Typography>
            <Button color="inherit" onClick={() => { handleBool('isLinkedModalOpen'); updateItem();}}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {items.total > 0 && (
            items.data.map(item => {
                let isChecked = checked.filter(check => (check._id === item._id)).length ? true : false;

                if(item._id === _id || item.type === 'contact') {
                  return null
                };

                return (
                <React.Fragment key={item._id}>
                  <ListItem button onClick={handleToggle(item)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={isChecked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': item.title }}
                      />
                    </ListItemIcon>
                    <ListItemText id={item.title} primary={item.title} secondary={item.type} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              )})
          )}
        </List>
      </Dialog>
    )
  }
}
