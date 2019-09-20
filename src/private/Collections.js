import React, { useState, useEffect } from 'react';
import { Link } from "@reach/router";
import Feathers from '../components/Feathers';
import AppMain from '../components/AppMain';
import AppFooter from '../components/AppFooter';
import Paper from '../components/Paper';
import NavigationBottom from '../components/NavigationBottom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack as faThumbtackSolid, faPlusSquare } from '@fortawesome/pro-solid-svg-icons';


export default function Collections() {
  const [error, setError] = useState(false);
  const [collections, setCollections] = useState({_id: 1, type: 'appointment', title: 'Test Appointment'});
  const search = { "$search": "katie" };
  const [query, setQuery] = useState({ "$sort": { "isPinned": "-1", "meta.updatedDate": "-1" } });

  function getCollections() {
    Feathers.service('collections').find({ query: query })
      .then(response => {
        setCollections(response);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <>
      <AppMain>
        <div className="pageHeader">
          <h2>Collections</h2>
          <Link to={`/collections/new`}>
            <FontAwesomeIcon icon={faPlusSquare} />
          </Link>
        </div>
        {collections.data && (
          <ul className="list">
            {collections.data.map((collection, index) => (
              <li key={collection._id}>
                <Link to={`/collections/${collection._id}`}>
                  <Paper>
                    {collection.isPinned && (
                      <p className="isPinned">
                        <FontAwesomeIcon icon={faThumbtackSolid} />
                      </p>
                    )}
                    <h3>{collection.title}</h3>
                  </Paper>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </AppMain>
      <AppFooter>
        <NavigationBottom />
      </AppFooter>
    </>
  )
};
