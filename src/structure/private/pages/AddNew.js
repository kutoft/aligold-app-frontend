import React from 'react';
import Collection from '../../../components/collection';
import Item from '../../../components/item';

export default function AddNew(props) {

  if(props.location.state.type === 'collection') {
    return (
      <Collection isNew={true} auth={props.auth} />
    )
  } else {
    return (
      <Item itemType={props.location.state.type} isNew={true} auth={props.auth} />
    )
  }
}
