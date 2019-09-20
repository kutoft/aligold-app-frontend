import React, { useState, useEffect } from 'react';
import Feathers from '../components/Feathers';
import AppMain from '../components/AppMain';
import AppFooter from '../components/AppFooter';
import NavigationBottom from '../components/NavigationBottom';
import DefaultCard from '../components/collection/DefaultCard';
import AppointmentCard from '../components/collection/AppointmentCard';
import NoteCard from '../components/collection/NoteCard';

export default function Stream() {
  const [error, setError] = useState(false);
  const [items, setItems] = useState({_id: 1, type: 'appointment', title: 'Test Appointment'});
  const [query, setQuery] = useState({ "type": { "$nin": ["contact"] }, "$sort": { "isPinned": "-1", "meta.updatedDate": "-1" } });

  function getItems() {
    Feathers.service('items').find({ query: query })
      .then(response => {
        setItems(response);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  useEffect(() => {
    getItems();
  }, []);

  function GetItemLink(props) {
    if(props.item.type === 'appointment') {
      return (
        <AppointmentCard item={props.item} />
      )
    } else if (props.item.type === 'note') {
      return (
        <NoteCard item={props.item} />
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
          <h2>Stream</h2>
        </div>
        {items.data && (
          <ul className="list">
            {items.data.map((item, index) => (
              <GetItemLink item={item} key={item._id} />
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
