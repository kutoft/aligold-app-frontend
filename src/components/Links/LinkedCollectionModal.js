import React, { useState, useEffect } from 'react';
import Feathers from '../../context/Feathers';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
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

export default function LinkedCollectionModal(props) {
  const classes = useStyles();
  const {
    isLinkedCollectionModalOpen,
    setIsLinkedCollectionModalOpen,
    handleCollectionChange,
    collectionId,
    updateItem,
    linked,
    _id,
  } = props;

  const [error, setError] = useState(false);
  const [collections, setItems] = useState([]);
  const [checked, setChecked] = useState(collectionId);

  const handleChange = (id) => {
    setChecked(id);
    handleCollectionChange(id);
  };

  function getCollections() {
    Feathers.service('collections')
      .find()
      .then(response => {
        setItems(response);
        console.log(response);
        setChecked(linked);
      })
      .catch(error => setError(error));
  }

  useEffect(() => {
    getCollections();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return null;
  } else {
    return (
      <Dialog
        fullScreen
        open={isLinkedCollectionModalOpen}
        onClose={() => setIsLinkedCollectionModalOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            {/*TODO: on close dont save state. reset back to initially loaded linked collections*/}
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsLinkedCollectionModalOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Linked Items
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                setIsLinkedCollectionModalOpen(false);
                updateItem();
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <RadioGroup defaultValue="" aria-label="collections" name="collections-radios">
          {collections.total > 0 &&
            collections.data.map(collection => {
              let isChecked = collectionId === collection._id ? true : false;

              return (
                <React.Fragment key={collection._id}>
                  <ListItem button onClick={(id) => handleChange(collection._id)}>
                    <ListItemIcon>
                      <Radio
                        edge="start"
                        name="collections"
                        checked={isChecked}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': collection.title }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={collection.title}
                      primary={collection.title}
                      secondary={collection.type}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </RadioGroup>
        </List>
      </Dialog>
    );
  }
}
