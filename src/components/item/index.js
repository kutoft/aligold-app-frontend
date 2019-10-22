import React, { useState, useEffect } from 'react';
import { Link, navigate } from "@reach/router";
import Feathers from '../../context/Feathers';
import { Icon } from '../../images/Icon';
import AppHeader from '../shared/AppHeader';
import AppMain from '../shared/AppMain';
import AppFooter from '../shared/AppFooter';
import AppointmentFields from './AppointmentFields';
import NoteFields from './NoteFields';
import ReminderFields from './ReminderFields';
import TodoFields from './TodoFields';
import ContactFields from './ContactFields';
import LinkedMenu from './linked/LinkedMenu';
import LinkedModal from './linked/LinkedModal';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid, faSave, faEllipsisV, faLongArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { faThumbtack as faThumbtackRegular } from '@fortawesome/pro-regular-svg-icons';

const useStyles = makeStyles(theme =>({
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
    borderBottom: '1px solid #fff',
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
    }
  },
  title: {
    color: theme.palette.common.white,
    margin: '1rem 10px 0',
    textTransform: 'capitalize',
  },
  titleInput: {
    margin: '7px 10px 1rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: theme.palette.common.white,
    backgroundColor: 'transparent',
    padding: '10px 15px',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '50px',
  },
  body: {
    borderRadius: '30px 30px 0 0',
    boxShadow: '0px 1px 20px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
  fields: props => ({
    display: `${props.itemType === 'note' ? 'flex' : 'block'}` ,
    flexGrow: `${props.itemType === 'note' ? '1' : 'inherit'}`,
    padding: `${props.itemType === 'note' ? '0rem' : '1rem'}`,
  }),
}));

export default function Item(props) {
  let fields = {};
  if(props.itemType === 'appointment') {
    fields = {
      date: {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
      },
      location: '',
      repeat: {
        isActive: false,
        amount: '',
        type: '',
        startOnDays: '',
        endType: '',
        endDate: '',
      },
    };
  } else if(props.itemType === 'note') {
    fields = {
      body: '',
    };
  } else if(props.itemType === 'todo') {
    fields = {
      todos: [{
        todo: '',
        isChecked: false,
      }],
      moveCheckedToBottom: false,
      hideChecked: false,
    };
  } else if(props.itemType === 'reminder') {
    fields = {
      date: {
        startDate: '',
        startTime: '',
      },
      notes: '',
    };
  } else if(props.itemType === 'contact') {
    fields = {
      isPrimary: false,
      firstName: '',
      middleName: '',
      lastName: '',
      occupation: '', // list of common jobs
      salutation: '', // list of personal and profesional titles (title is being used at generic level)
      emails: [],
      phones: [],
      addresses: []
    };
  } else {
    fields = {};
  }

  const classes = useStyles(props);
  const [error, setError] = useState(false);
  const [item, setItem] = useState({title: '', fields: fields, linked: [], labels: [],meta: {collaborators: []}});
  const [isPinned, setIsPinned] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [isLinkedModalOpen, setIsLinkedModalOpen] = useState(false);
  const [isLabelMenu, setIsLabelMenu] = useState(false);

  function getItem() {
    Feathers.service('items').get(props.id)
      .then(response => {
        setItem(response);
        setIsPinned(response.isPinned);
        console.log(response);
      })
      .catch(error => setError(error));
  };

  function createItem() {
    console.log(item);
    Feathers.service('items').create(item)
      .then(response => {
        setItem(response);
        console.log('create:' + response);
      })
      .catch(error => {
        setError(error);
        console.log('create');
      });
  };

  function updateItem() {
    Feathers.service('items').update(props.id, item)
      .then(response => {
        setItem(response);
        console.log(response);
      })
      .catch(error => setError(error));
  };

  function handleSubmit(e) {
    if (props.isNew === true) {
      createItem();
    } else {
      updateItem();
    }
    navigate('/');
  };

  function handleBack() {
    navigate(window.history.back());
  }

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    setItem({
      ...item,
      [name]: value,
    });
  };

  function handleFieldsChange(e, level1) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    let fields = item.fields;
    if(fields === undefined) {fields = {};}
    if(level1 !== undefined) {
      let level
      if(fields[level1] === undefined) {
        level = {};
      } else {
        level = fields[level1];
      }
      level[name] = value;
      fields[level1] = level;
    } else {
      fields[name] = value;
    }

    setItem({
      ...item,
      fields
    });
  };

  function handleEditorChange(content) {
    const fields = item.fields;
    fields.body = content;
    setItem({
      ...item,
      fields
    });
  }

  function handleLinkedChange(value) {
    let array = [];
    let count;
    for(count = 0; count < value.length; count++) {
      let obj = {};
      obj._id = value[count]._id;
      obj.title = value[count].title;
      obj.type = value[count].type;
      obj.fields = value[count].fields;
      obj.collectionId = value[count].collectionId;
      array.push(obj);
    }
    setItem({
      ...item,
      linked: array
    });
  };

  function handleBool(type) {
    switch(type) {
      case 'isSubMenu':
        setIsSubMenu(!isSubMenu);
        break;
      case 'isLinkedModalOpen':
        setIsLinkedModalOpen(!isLinkedModalOpen);
        break;
      case 'isLabelMenu':
        setIsLabelMenu(!isLabelMenu);
        break;
      case 'isPinned':
        setItem({
          ...item,
          isPinned: !isPinned,
        });
        setIsPinned(!isPinned);
        break;
      default:
        setItem({
          ...item,
          isPinned: !isPinned,
        });
        setIsPinned(!isPinned);
        break;
    }
  };

  useEffect(() => {
    let data = Object.assign({}, item);
    data.type = props.itemType;
    // data.collectionId = props.collectionId;

    setItem(data);

    if(props.isNew === false) {
      getItem();
    }
  }, []);

  useEffect(() => {
    getItem();
  }, [props.id]);

  return (
    <div className={classes.root}>
      <AppHeader className={classes.header} >
        <div className="flex-list-h">
          <div onClick={() => handleBack()}>
            <FontAwesomeIcon icon={faLongArrowLeft} />
          </div>
          <div className={classes.img}>
            <Icon color="white" />
          </div>
        </div>
        <div className="flex-list-h">
          <div className={classes.users} onClick={() => handleBool('isSubMenu')}>
            {item.meta.collaborators.map(user => (
              <img key={user._id} src={user.picture} alt={user.name} />
            ))}
          </div>
          <div
            onClick={(e) => handleBool('isPinned')}
          >
            {isPinned && (
              <FontAwesomeIcon icon={faThumbtackSolid} />
            )}
            {!isPinned && (
              <FontAwesomeIcon icon={faThumbtackRegular} />
            )}
          </div>
          <div
            onClick={(e) => handleSubmit(e)}
          >
            <FontAwesomeIcon icon={faSave} />
          </div>
        </div>
      </AppHeader>
      <AppMain type="item" className="item">
        <h6 className={classes.title}>{props.itemType} {props.itemType === 'contact' ? 'Name' : 'Title'}</h6>
        <input
          id="title"
          className={classes.titleInput}
          type="text"
          name="title"
          placeholder={props.itemType === "contact" ? `${props.itemType} Nickname` : `${props.itemType} Title`}
          value={item.title}
          onChange={(e) => handleChange(e)}
        />
        <Paper className={classes.body}>
          <div className={classes.fields}>
            {props.itemType === 'appointment' && (
              <AppointmentFields fields={item.fields} handleFieldsChange={handleFieldsChange} />
            )}
            {props.itemType === 'note' && (
              <NoteFields fields={item.fields} handleEditorChange={handleEditorChange} />
            )}
            {props.itemType === 'reminder' && (
              <ReminderFields fields={item.fields} handleFieldsChange={handleFieldsChange} />
            )}
            {props.itemType === 'todo' && (
              <TodoFields fields={item.fields} handleFieldsChange={handleFieldsChange} />
            )}
            {props.itemType === 'contact' && (
              <ContactFields fields={item.fields} handleFieldsChange={handleFieldsChange} />
            )}
          </div>
          <div className={classes.links}>
            <LinkedMenu item={item} handleBool={handleBool} />
          </div>
        </Paper>
      </AppMain>
      {isLinkedModalOpen && (
        <LinkedModal isLinkedModalOpen={isLinkedModalOpen} handleBool={handleBool} handleLinkedChange={handleLinkedChange} updateItem={updateItem} linked={item.linked} _id={item._id} />
      )}
    </div>
  )
};
