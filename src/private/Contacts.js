import React, { useState, useEffect } from 'react';
import Feathers from '../components/Feathers';
import AppMain from '../components/AppMain';
import AppFooter from '../components/AppFooter';
import ContactCard from '../components/collection/ContactCard';
import NavigationBottom from '../components/NavigationBottom';

export default function Contacts() {
  const [error, setError] = useState(false);
  const [contacts, setContacts] = useState({test: 'test'});
  const [query, setQuery] = useState({ type: 'contact', "$sort": { "title": "-1" } });

  function getContacts() {
    Feathers.service('items').find({ query: query })
      .then(response => {
        setContacts(response);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <>
      <AppMain>
        <div className="pageHeader">
          <h2>Contacts</h2>
        </div>
        {contacts.data && (
          <ul className="list">
            {contacts.data.map((contact, index) => (
              <ContactCard item={contact} key={contact._id} />
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
