import React, { useState, useEffect } from 'react';
import { Link, navigate } from "@reach/router";
import Feathers from '../Feathers';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid, faSave, faEllipsisV, faLongArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { faThumbtack as faThumbtackRegular } from '@fortawesome/pro-regular-svg-icons';

const useStyles = makeStyles({
  header: {
    justifyContent: 'space-between',
  },
  title: {
    '& div': {
      margin: '0',
      borderRadius: '0',
    },
    '& input': {
      padding: '21px 1rem 18px',
      fontWeight: 'bold',
      fontSize: Variables.fontSize.xLarge,
      textTransform: 'capitalize',
    },
  },
  fields: props => ({
    display: `${props.itemType === 'note' ? 'flex' : 'block'}` ,
    flexGrow: `${props.itemType === 'note' ? '1' : 'inherit'}`,
    padding: `${props.itemType === 'note' ? '0rem' : '1rem'}`,
  }),
});

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
      type: '',
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
  const [item, setItem] = useState({title: '', fields: fields, linked: [], labels: []});
  const [isPinned, setIsPinned] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [isLinkedModalOpen, setIsLinkedModalOpen] = useState(false);
  const [isLabelMenu, setIsLabelMenu] = useState(false);

  // const user = Feathers.get('authentication');
  // console.log(user);

  function getItem() {
    Feathers.service('items').get(props.id, props.auth.user)
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
    navigate(window.history.back());
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
  }, [props.itemId]);

  return (
    <>
      <AppHeader className={classes.header} >
        <div className="flex-list-h">
          <div onClick={() => handleBack()}>
            <FontAwesomeIcon icon={faLongArrowLeft} />
          </div>
          {
            // <h6>{props.itemType.toUpperCase()}</h6>
          }
        </div>
        <div className="flex-list-h">
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
          <div
            onClick={() => handleBool('isSubMenu')}
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        </div>
      </AppHeader>
      <AppMain type="item" className="item">
        <div className={classes.title}>
          <TextField
            id="title"
            name="title"
            placeholder={props.itemType === "contact" ? `${props.itemType} Nickname` : `${props.itemType} Title`}
            value={item.title}
            onChange={(e) => handleChange(e)}
            fullWidth
            margin="normal"
            variant="filled"
            inputProps={{ 'aria-label': 'title' }}
          />
        </div>
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
      </AppMain>
      <AppFooter type="item" className="item">
        <LinkedMenu item={item} handleBool={handleBool} />
      </AppFooter>
      {isLinkedModalOpen && (
        <LinkedModal isLinkedModalOpen={isLinkedModalOpen} handleBool={handleBool} handleLinkedChange={handleLinkedChange} updateItem={updateItem} linked={item.linked} _id={item._id} />
      )}
    </>
  )
};
