import React, { useState, useEffect } from 'react';
import Feathers from '../components/Feathers';
import AppMain from '../components/AppMain';
import AppFooter from '../components/AppFooter';
import DefaultCard from '../components/collection/DefaultCard';
import AppointmentCard from '../components/collection/AppointmentCard';
import NavigationBottom from '../components/NavigationBottom';

export default function Calendar() {
  const [error, setError] = useState(false);
  const [events, setEvents] = useState({test: 'test'});
  const [query, setQuery] = useState({
    $or: [
      { type: 'appointment' },
      { type: 'reminder' }
    ]
  });

  function getEvents() {
    Feathers.service('items').find({ query: query })
      .then(response => {
        setEvents(response);
        console.log(response);
      })
      .catch(error => setError(error));
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <AppMain>
        <div className="pageHeader">
          <h2>Calendar</h2>
        </div>
        {events.data && (
          <ul className="list">
            {events.data.map((e, index) => {
              if(e.type === 'appointment') {
                return(
                  <AppointmentCard item={e} key={e._id} />
                )
              } else if(e.type === 'reminder') {
                return(
                  <DefaultCard item={e} key={e._id} />
                )
              }
            })}
          </ul>
        )}
      </AppMain>
      <AppFooter>
        <NavigationBottom />
      </AppFooter>
    </>
  )
};
