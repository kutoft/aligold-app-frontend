import React, { useState, useEffect } from 'react';
import { Link } from "@reach/router";
import Feathers from '../../../context/Feathers';
import AppMain from '../../../components/shared/AppMain';
import SubNav from '../../../components/home/SubNav';
import DefaultCard from '../../../components/home/DefaultCard';
import AppointmentCard from '../../../components/home/AppointmentCard';
import NoteCard from '../../../components/home/NoteCard';
import ContactCard from '../../../components/home/ContactCard';
import CollectionFilter from '../../../components/home/CollectionFilter';
import CollectionFilterAdd from '../../../components/home/CollectionFilterAdd';
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLongArrowLeft } from '@fortawesome/pro-solid-svg-icons';

import { Variables } from '../../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
  },
  collectionsOverflow: {
    width: '100vw',
    minHeight: '53px',
    overflowY: 'auto',
  },
  collections: {
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  collectionsTitle: {
    color: theme.palette.common.white,
    margin: '1rem 10px 0',
  },
  body: {
    borderRadius: '30px 30px 0 0',
    boxShadow: '0px 1px 20px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
  list: {
    minHeight: 'calc(100vh - 224px)',
    margin: '0',
    padding: '1rem',
  },
}));

export default function Collection(props) {
  const classes = useStyles();
  const [items, setItems] = useState({_id: 1, type: 'appointment', title: 'Test Appointment'});
  const [itemsError, setItemsError] = useState(false);
  const [collections, setCollections] = useState({title: ''});
  const [collectionsError, setCollectionsError] = useState(false);
  const [subNav, setSubNav] = useState('stream');
  const [collectionId, setCollectionId] = useState('');
  const [collectionIndex, setCollectionIndex] = useState();
  const [sort, setSort] = useState({ "isPinned": "-1", "meta.updatedDate": "-1" });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [query, setQuery] = useState({ type: { "$nin": ["contact"] }, $sort: sort});
  const [prevQuery, setPrevQuery] = useState();

  const { auth } = props;

  function getCollections() {
    Feathers.service('collections').find()
      .then(response => {
        setCollections(response);
        console.log(response);
      })
      .catch(error => setCollectionsError(error));
  };

  function getItems() {
    Feathers.service('items').find({ query: query })
      .then(response => {
        setItems(response);
        console.log(response);
      })
      .catch(error => setItemsError(error));
  }

  function toggleCollection(id, index) {
    if(collectionId === id) {
      setCollectionId('');
    } else {
      setCollectionId(id);
    }
    setCollectionIndex(index);
  }

  useEffect(() => {
    getCollections();
    getItems();
  }, []);

  useEffect(() => {
    let obj = {};

    if(collectionId !== '') {
      obj.collectionId = collectionId;
    }
    if(subNav === 'stream') {
      obj.type = { "$nin": ["contact"] };
    } else {
      obj.type = "contact";
    }
    obj.$sort = sort;

    setPrevQuery(obj);
    setQuery(obj);
  }, [collectionId, subNav, sort]);

  useEffect(() => {
    let obj = {};
    if(searchQuery === '') {
      obj = prevQuery;
    } else {
      obj.$search = searchQuery;
    }
    setQuery(obj);
  }, [searchQuery]);

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
    <AppMain>
      {collections.data && (
        <>
          <h6 className={classes.collectionsTitle}>Collection Filter</h6>
          <div className={classes.collectionsOverflow}>
            <div className={classes.collections}>
              {collections.data.map((collection, index) => (
                <CollectionFilter key={collection._id} index={index} collection={collection} collectionIndex={collectionIndex} toggleCollection={toggleCollection} />
              ))}
              <CollectionFilterAdd />
            </div>
          </div>
        </>
      )}
      <Paper className={classes.body}>
        <SubNav subNav={subNav} setSubNav={setSubNav} searchOpen={searchOpen} setSearchOpen={setSearchOpen} setSearchQuery={setSearchQuery} />
        {items.data && (
          <ul className={`${classes.list} list`}>
            {items.data.map((item, index) => (
              <GetItemLink key={item._id} item={item} />
            ))}
          </ul>
        )}
      </Paper>
    </AppMain>
  )
};