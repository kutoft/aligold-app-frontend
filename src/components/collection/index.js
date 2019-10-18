import React, { useState, useEffect } from 'react';
import { Link } from "@reach/router";
import Feathers from '../../context/Feathers';
import AppMain from '../shared/AppMain';
import TextField from '@material-ui/core/TextField';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid, faSave, faLongArrowLeft } from '@fortawesome/pro-solid-svg-icons';
import { faThumbtack as faThumbtackRegular } from '@fortawesome/pro-regular-svg-icons';


export default function Collection(props) {
  const [error, setError] = useState(false);
  const [collection, setCollection] = useState({title: ''});
  const [isPinned, setIsPinned] = useState(false);

  function getCollection() {
    Feathers.service('collections').get(props.id)
      .then(response => {
        setCollection(response);
        setIsPinned(response.isPinned);
        console.log(response);
      })
      .catch(error => setError(error));
  };

  function createCollection() {
    console.log(collection);
    Feathers.service('collections').create(collection)
      .then(response => {
        setCollection(response);
        console.log('create:' + response);
      })
      .catch(error => {
        setError(error);
        console.log('create');
      });
  };

  function updateCollection() {
    Feathers.service('collections').update(props.id, collection)
      .then(response => {
        setCollection(response);
        console.log(response);
      })
      .catch(error => setError(error));
  };

  function handleSubmit(e) {
    if (props.isNew === true) {
      createCollection();
    } else {
      updateCollection();
    }
  };

  function handleChange(e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;

    setCollection({
      ...collection,
      [name]: value,
    });
  };

  function handleBool(type) {
    switch(type) {
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
  };

  useEffect(() => {
    if(props.isNew === false) {
      getCollection();
    }
  }, []);

  return (
    <>
      <AppMain>
        <div className="pageHeader">
          <div className="flex-list-h">
            <Link to={`/collections/${props.id}`}>
              <FontAwesomeIcon icon={faLongArrowLeft} />
            </Link>
            <h6>Collection</h6>
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
          </div>
        </div>
        <div className="title">
          <TextField
            id="title"
            name="title"
            label="Title"
            value={collection.title}
            onChange={(e) => handleChange(e)}
            fullWidth
            margin="normal"
            variant="filled"
          />
        </div>
        <div className="fields">
        </div>
      </AppMain>
    </>
  )
};
