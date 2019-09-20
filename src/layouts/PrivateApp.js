import React from 'react';
import '../App.css';
import { Router } from "@reach/router";
import DashboardWrapper from '../components/DashboardWrapper';
import Collections from '../private/Collections';
import Collection from '../private/Collection';
import CollectionNewEdit from '../private/CollectionNewEdit';
import Stream from '../private/Stream';
import Item from '../private/Item';
import Contacts from '../private/Contacts';
import Calendar from '../private/Calendar';
import Account from '../private/Account';

export default function PrivateApp(props) {

  return (
    <Router>
      <DashboardWrapper path="/">
        <Collections path="/" default auth={props.auth} />
        <Collections path="collections" auth={props.auth} />
        <Collection path="collections/:collectionId" auth={props.auth} />
        <CollectionNewEdit path="collections/:collectionId/edit" isNew={false} auth={props.auth} />
        <CollectionNewEdit path="collections/new" isNew={true} auth={props.auth} />
        <Item path="collections/:collectionId/:itemType/:itemId" isNew={false} auth={props.auth} />
        <Item path="collections/:collectionId/:itemType/new" isNew={true} auth={props.auth} />
        <Stream path="stream" auth={props.auth} />
        <Contacts path="contacts" auth={props.auth} />
        <Calendar path="calendar" auth={props.auth} />
        <Account path="account" auth={props.auth} />
      </DashboardWrapper>
    </Router>
  );

};
