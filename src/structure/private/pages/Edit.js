import React from 'react';
import Collection from '../../../components/collection';
import Item from '../../../components/item';

export default function Edit(props) {

  if(props.location.state.type === 'collection') {
    return (
      <Collection id={props.id} isNew={false} auth={props.auth} />
    )
  } else {
    return (
      <Item id={props.id} itemType={props.location.state.type} isNew={false} auth={props.auth} />
    )
  }
}
