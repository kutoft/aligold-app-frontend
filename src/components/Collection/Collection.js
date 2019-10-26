import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import Feathers from '../../context/Feathers';
import { Icon } from '../../images/Icon';
import AppHeader from '../shared/AppHeader';
import AppMain from '../shared/AppMain';
import ItemTitle from '../Item/ItemTitle';
import PaperBody from '../PaperBody/';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbtack as faThumbtackSolid,
  faSave,
  faLongArrowLeft,
} from '@fortawesome/pro-solid-svg-icons';
import { faThumbtack as faThumbtackRegular } from '@fortawesome/pro-regular-svg-icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: `linear-gradient(140deg, ${theme.palette.secondary.dark} 15%, ${theme.palette.secondary.main} 50%, ${theme.palette.secondary.dark} 100%)`,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },
  header: {
    color: theme.palette.common.white,
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.palette.secondary.light}`,
    justifyContent: 'space-between',
  },
  img: {
    width: '30px',
    paddingLeft: '0 !important',
    boxSizing: 'content-box',
  },
  users: {
    display: 'flex',
    flexDirection: 'row-reverse',
    '& img': {
      width: '30px',
      overflow: 'hidden',
      borderRadius: '50%',
      marginRight: '-10px',
      boxShadow: '2px 2px 5px 0px rgba(0,0,0,0.5)',
      '&:first-child': {
        margin: '0',
      },
    },
  },
  fields: {
    margin: '30px 10px 15px',
  },
}));

export default function Collection(props) {
  const classes = useStyles(props);
  const [error, setError] = useState(false);
  const [collection, setCollection] = useState({
    title: '',
    primaryContact: {},
    meta: { collaborators: [] },
  });
  const [contacts, setContacts] = useState([]);
  const [selectValue, setSelectValue] = useState(collection.primaryContact._id);
  const [isPinned, setIsPinned] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const inputLabel = React.useRef(null);

  function getCollection() {
    Feathers.service('collections')
      .get(props.id)
      .then(response => {
        setCollection(response);
        setIsPinned(response.isPinned);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  function createCollection() {
    console.log(collection);
    Feathers.service('collections')
      .create(collection)
      .then(response => {
        setCollection(response);
        console.log('create:' + response);
      })
      .catch(error => {
        setError(error);
        console.log('create');
      });
  }

  function updateCollection() {
    Feathers.service('collections')
      .update(props.id, collection)
      .then(response => {
        setCollection(response);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  function getContacts() {
    Feathers.service('items')
      .find({ query: { type: 'contact', $sort: { title: -1 } } })
      .then(response => {
        console.log(response);
        setContacts(response.data);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  function handleSubmit(e) {
    if (props.isNew === true) {
      createCollection();
    } else {
      updateCollection();
    }
    navigate('/');
  }

  function handleChange(e) {
    let value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    let name = e.target.name;

    setSelectValue(value);

    if (name === 'primaryContact') {
      contacts.map(contact => {
        if (contact._id === value) {
          value = contact;
        }
      });
    }

    setCollection({
      ...collection,
      [name]: value,
    });
  }

  function handleBack() {
    navigate(window.history.back());
  }

  function handleBool(type) {
    switch (type) {
      case 'isPinned':
        setCollection({
          ...collection,
          isPinned: !isPinned,
        });
        setIsPinned(!isPinned);
        break;
      default:
        setCollection({
          ...collection,
          isPinned: !isPinned,
        });
        setIsPinned(!isPinned);
        break;
    }
  }

  useEffect(() => {
    if (props.isNew === false) {
      getCollection();
    }
  }, []);

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    setSelectValue(collection.primaryContact._id);
  }, [collection]);

  return (
    <div className={classes.root}>
      <AppHeader className={classes.header}>
        <div className="flex-list-h">
          <div onClick={() => handleBack()}>
            <FontAwesomeIcon icon={faLongArrowLeft} />
          </div>
          <div className={classes.img}>
            <Icon color="white" />
          </div>
        </div>
        <div className="flex-list-h">
          <div
            className={classes.users}
            onClick={() => handleBool('isSubMenu')}
          >
            {collection.meta.collaborators.map(user => (
              <img key={user._id} src={user.picture} alt={user.name} />
            ))}
          </div>
          <div onClick={e => handleBool('isPinned')}>
            {isPinned && <FontAwesomeIcon icon={faThumbtackSolid} />}
            {!isPinned && <FontAwesomeIcon icon={faThumbtackRegular} />}
          </div>
          <div onClick={e => handleSubmit(e)}>
            <FontAwesomeIcon icon={faSave} />
          </div>
        </div>
      </AppHeader>
      <AppMain type="item" className="item">
        <ItemTitle
          item={collection}
          itemType="collection"
          handleChange={handleChange}
        />
        <PaperBody>
          <div className={classes.fields}>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel ref={inputLabel} htmlFor="primaryContact">
                Primary Contact
              </InputLabel>
              <Select
                value={selectValue}
                onChange={e => handleChange(e)}
                labelWidth={labelWidth}
                inputProps={{
                  name: 'primaryContact',
                  id: 'primaryContact',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {contacts &&
                  contacts.map(contact => (
                    <MenuItem key={contact._id} value={contact._id}>
                      {contact.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </PaperBody>
      </AppMain>
    </div>
  );
}
