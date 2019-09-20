import React, { useState, useEffect } from 'react';
import { Link } from "@reach/router";
import Feathers from '../components/Feathers';
import AppMain from '../components/AppMain';
import AppFooter from '../components/AppFooter';
import CollectionActions from '../components/collection/CollectionActions';
import DefaultCard from '../components/collection/DefaultCard';
import AppointmentCard from '../components/collection/AppointmentCard';
import NoteCard from '../components/collection/NoteCard';
import ContactCard from '../components/collection/ContactCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLongArrowLeft } from '@fortawesome/pro-solid-svg-icons';

import { Variables } from '../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
  subNav: {
    display: 'flex',
    justifyContent: 'center',
    '& div': {
      width: '50%',
      padding: '0.5rem 1rem',
      textAlign: 'center',
      fontSize: Variables.fontSize.medium,
      backgroundColor: Variables.colors.primary,
      color: Variables.colors.white,
      '&.active': {
        color: Variables.colors.secondaryLight,
      }
    }
  },
});

export default function Collection(props) {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [items, setItems] = useState({_id: 1, type: 'appointment', title: 'Test Appointment'});
  const [collection, setCollection] = useState({title: ''});
  const [subNav, setSubNav] = useState('stream');
  const [query, setQuery] = useState({ "collectionId": props.collectionId, "type": { "$nin": ["contact"] }, "$sort": { "isPinned": "-1", "meta.updatedDate": "-1" } });


  function getCollection() {
    Feathers.service('collections').get(props.collectionId)
      .then(response => {
        setCollection(response);
        console.log(response);
      })
      .catch(error => setError(error));
  };

  function getItems() {
    Feathers.service('items').find({ query: query })
      .then(response => {
        setItems(response);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  function handleSubNav(nav) {
    setSubNav(nav);
    if(nav === 'stream') {
      setQuery({ "collectionId": props.collectionId, "type": { "$nin": ["contact"] }, "$sort": { "isPinned": "-1", "meta.updatedDate": "-1" } });
    } else if (nav === 'contacts') {
      setQuery({ "collectionId": props.collectionId, "type": "contact", "$sort": { "isPinned": "-1", "meta.updatedDate": "-1" } });
    }
  }

  useEffect(() => {
    getCollection();
    getItems();
  }, []);

  useEffect(() => {
    getItems();
  }, [query]);

  function GetItemLink(props) {
    if(props.item.type === 'appointment') {
      return (
        <AppointmentCard item={props.item} />
      )
    } else if (props.item.type === 'note') {
      return (
        <NoteCard item={props.item} />
      )
    } else if (props.item.type === 'contact') {
      return (
        <ContactCard item={props.item} />
      )
    } else {
      return (
        <DefaultCard item={props.item} />
      )
    }
  }

  return (
    <>
      <AppMain>
        <div className="pageHeader">
          <div className="flex-list-h" >
            <Link to="/collections">
              <FontAwesomeIcon icon={faLongArrowLeft} />
            </Link>
            <h6>{collection.title}</h6>
          </div>
          <div className="flex-list-h" >
            <Link to="edit">
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </div>
        </div>
        <div className={classes.subNav}>
          <div className={`navItem${subNav === 'stream' ? ' active' : ''}`} onClick={(nav) => handleSubNav('stream')}>
            Stream
          </div>
          <div className={`navItem${subNav === 'contacts' ? ' active' : ''}`} onClick={(nav) => handleSubNav('contacts')}>
            Contacts
          </div>
        </div>
        {items.data && (
          <ul className="list">
            {items.data.map((item, index) => (
              <GetItemLink key={item._id} item={item} />
            ))}
          </ul>
        )}
      </AppMain>
      <AppFooter>
        <CollectionActions />
      </AppFooter>
    </>
  )
};
