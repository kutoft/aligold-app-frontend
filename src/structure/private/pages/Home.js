import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import Feathers from '../../../context/Feathers';
import AppMain from '../../../components/shared/AppMain';
import SubNav from '../../../components/home/SubNav';
import CollectionFilter from '../../../components/home/CollectionFilter';
import CollectionFilterAdd from '../../../components/home/CollectionFilterAdd';
import PaperBody from '../../../components/PaperBody/';
import Cards from '../../../components/Cards/';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faLongArrowLeft } from '@fortawesome/pro-solid-svg-icons';

import { Variables } from '../../../constants/Variables';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {},
  collectionsOverflow: {
    width: '100vw',
    minHeight: '63px',
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
  formControl: {
    margin: '7px 5px 1rem',
    padding: '3px 3px 3px 15px',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    '& > div': {
      color: theme.palette.common.white,
      height: '30px',
      fontSize: '0.67rem',
      fontWeight: 'bold',
      width: '100%',
    },
    '& svg': {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.common.white,
      borderRadius: '0 20px 20px 0',
      height: '30px',
      width: '30px',
      top: 'calc(50% - 15px)',
    }
  },
  body: {
    borderRadius: '30px 30px 0 0',
    boxShadow:
      '0px 1px 20px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)',
  },
  list: {
    minHeight: 'calc(100vh - 224px)',
    margin: '0',
    padding: '1rem',
  },
}));

export default function Collection(props) {
  const classes = useStyles();
  const [items, setItems] = useState({
    _id: 1,
    type: 'appointment',
    title: 'Test Appointment',
  });
  const [itemsError, setItemsError] = useState(false);
  const [collections, setCollections] = useState({ title: '' });
  const [collectionsError, setCollectionsError] = useState(false);
  const [subNav, setSubNav] = useState('stream');
  const [collectionId, setCollectionId] = useState('');
  const [itemType, setItemType] = useState('');
  const [collectionIndex, setCollectionIndex] = useState();
  const [sort, setSort] = useState({
    isPinned: '-1',
    'meta.updatedDate': '-1',
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [query, setQuery] = useState({
    type: { $nin: ['contact'] },
    $sort: sort,
  });
  const [prevQuery, setPrevQuery] = useState();

  const { auth } = props;

  function getCollections() {
    Feathers.service('collections')
      .find()
      .then(response => {
        setCollections(response);
        console.log(response);
      })
      .catch(error => setCollectionsError(error));
  }

  function getItems() {
    Feathers.service('items')
      .find({ query: query })
      .then(response => {
        setItems(response);
        console.log(response);
      })
      .catch(error => setItemsError(error));
  }

  function toggleCollection(id, index) {
    if (collectionId === id) {
      setCollectionId('');
    } else {
      setCollectionId(id);
    }
    setCollectionIndex(index);
  }

  function handleCollectionSelect(e) {
    setCollectionId(e.target.value);
  }

  function handleItemTypeSelect(e) {
    setItemType(e.target.value);
  }

  useEffect(() => {
    getCollections();
    getItems();
  }, []);

  useEffect(() => {
    let obj = {};

    if (collectionId !== '') {
      obj.collectionId = collectionId;
    }
    if (subNav === 'stream') {
      obj.type = { $nin: ['contact'] };
    } else {
      obj.type = 'contact';
    }
    obj.$sort = sort;

    setPrevQuery(obj);
    setQuery(obj);
  }, [collectionId, subNav, sort]);

  useEffect(() => {
    let obj = {};
    if (searchQuery === '') {
      obj = prevQuery;
    } else {
      obj.$search = searchQuery;
    }
    setQuery(obj);
  }, [searchQuery]);

  useEffect(() => {
    getItems();
  }, [query]);

  return (
    <AppMain>
      {collections.data && !searchOpen && (
        <>
          <h6 className={classes.collectionsTitle}>Collection Filter</h6>
          <div className={classes.collectionsOverflow}>
            <div className={classes.collections}>
              {collections.data.map((collection, index) => (
                <CollectionFilter
                  key={collection._id}
                  index={index}
                  collection={collection}
                  collectionId={collectionId}
                  collectionIndex={collectionIndex}
                  toggleCollection={toggleCollection}
                />
              ))}
              <CollectionFilterAdd />
            </div>
          </div>
        </>
      )}
      {searchOpen && (
        <>
          <h6 className={classes.collectionsTitle}>Search Filter</h6>
          <div className={classes.collectionsOverflow}>
            <div className={classes.collections}>
              <FormControl className={classes.formControl}>
                <Select
                  displayEmpty
                  id="collection_filter_select"
                  value={collectionId}
                  onChange={(e) => handleCollectionSelect(e)}
                >
                  <MenuItem value="">
                    <em>No Collection</em>
                  </MenuItem>
                  {collections.data.map((collection, index) => (
                    <MenuItem key={collection._id} value={collection._id} >{collection.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Select
                  displayEmpty
                  id="item_type_filter_select"
                  value={itemType}
                  onChange={(e) => handleItemTypeSelect(e)}
                >
                  <MenuItem value="">
                    <em>No Item Type</em>
                  </MenuItem>
                  <MenuItem value="appointment" >Appointment</MenuItem>
                  <MenuItem value="reminder" >Reminder</MenuItem>
                  <MenuItem value="note" >Note</MenuItem>
                  <MenuItem value="contact" >Contact</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </>
      )}
      <PaperBody className={classes.body}>
        <SubNav
          subNav={subNav}
          setSubNav={setSubNav}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          setSearchQuery={setSearchQuery}
        />

        {items.data && (
          <ul className={`${classes.list} list`}>
            {items.data.map((item, index) => (
              <Cards key={item._id} item={item} />
            ))}
          </ul>
        )}
      </PaperBody>
    </AppMain>
  );
}
