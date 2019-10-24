import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import Feathers from '../../context/Feathers';
import { Icon } from '../../images/Icon';
import AppHeader from '../shared/AppHeader';
import AppMain from '../shared/AppMain';
import Fields from '../Fields/';
import LinkedMenu from '../Links/';
import ItemTitle from './ItemTitle';
import { Variables } from '../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PaperBody from '../PaperBody/';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbtack as faThumbtackSolid,
  faSave,
  faEllipsisV,
  faLongArrowLeft,
} from '@fortawesome/pro-solid-svg-icons';
import { faThumbtack as faThumbtackRegular } from '@fortawesome/pro-regular-svg-icons';

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
  fields: props => ({
    display: `${props.itemType === 'note' ? 'flex' : 'block'}`,
    flexGrow: `${props.itemType === 'note' ? '1' : 'inherit'}`,
    padding: `${props.itemType === 'note' ? '0rem' : '1rem'}`,
  }),
}));

export default function Item(props) {
  const { itemType, isNew, id } = props;
  let fields = {};
  if (itemType === 'appointment') {
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
  } else if (itemType === 'note') {
    fields = {
      body: '',
    };
  } else if (itemType === 'todo') {
    fields = {
      todos: [
        {
          todo: '',
          isChecked: false,
        },
      ],
      moveCheckedToBottom: false,
      hideChecked: false,
    };
  } else if (itemType === 'reminder') {
    fields = {
      date: {
        startDate: '',
        startTime: '',
      },
      notes: '',
    };
  } else if (itemType === 'contact') {
    fields = {
      isPrimary: false,
      firstName: '',
      middleName: '',
      lastName: '',
      occupation: '', // list of common jobs
      salutation: '', // list of personal and profesional titles (title is being used at generic level)
      emails: [],
      phones: [],
      addresses: [],
    };
  } else {
    fields = {};
  }

  const classes = useStyles(props);
  const [error, setError] = useState(false);
  const [item, setItem] = useState({
    title: '',
    fields: fields,
    linked: [],
    labels: [],
    meta: { collaborators: [] },
  });
  const [isPinned, setIsPinned] = useState(false);
  const [isSubMenu, setIsSubMenu] = useState(false);
  const [isLabelMenu, setIsLabelMenu] = useState(false);

  function getItem() {
    Feathers.service('items')
      .get(id)
      .then(response => {
        setItem(response);
        setIsPinned(response.isPinned);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  function createItem() {
    console.log(item);
    Feathers.service('items')
      .create(item)
      .then(response => {
        setItem(response);
        console.log('create:' + response);
      })
      .catch(error => {
        setError(error);
        console.log('create');
      });
  }

  function updateItem() {
    Feathers.service('items')
      .update(id, item)
      .then(response => {
        setItem(response);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  function handleSubmit(e) {
    if (isNew === true) {
      createItem();
    } else {
      updateItem();
    }
    navigate('/');
  }

  function handleBack() {
    navigate(window.history.back());
  }

  function handleChange(e) {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    setItem({
      ...item,
      [name]: value,
    });
  }

  function handleFieldsChange(e, level1) {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    let fields = item.fields;
    if (fields === undefined) {
      fields = {};
    }
    if (level1 !== undefined) {
      let level;
      if (fields[level1] === undefined) {
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
      fields,
    });
  }

  function handleEditorChange(content) {
    const fields = item.fields;
    fields.body = content;
    setItem({
      ...item,
      fields,
    });
  }

  function handleLinkedChange(value) {
    let array = [];
    let count;
    for (count = 0; count < value.length; count++) {
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
      linked: array,
    });
  }

  function handleBool(type) {
    switch (type) {
      case 'isSubMenu':
        setIsSubMenu(!isSubMenu);
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
  }

  useEffect(() => {
    let data = Object.assign({}, item);
    data.type = itemType;
    // data.collectionId = props.collectionId;

    setItem(data);

    if (isNew === false) {
      getItem();
    }
  }, []);

  useEffect(() => {
    getItem();
  }, [id]);

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
            {item.meta.collaborators.map(user => (
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
          item={item}
          itemType={itemType}
          handleChange={handleChange}
        />
        <PaperBody>
          <div className={classes.fields}>
            <Fields
              type={itemType}
              item={item}
              handleFieldsChange={handleFieldsChange}
              handleEditorChange={handleEditorChange}
            />
          </div>
          <div className={classes.links}>
            <LinkedMenu
              item={item}
              handleLinkedChange={handleLinkedChange}
              updateItem={updateItem}
            />
          </div>
        </PaperBody>
      </AppMain>
    </div>
  );
}
