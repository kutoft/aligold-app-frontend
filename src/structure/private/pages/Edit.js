import React from 'react';
import Collection from '../../../components/Collection';
import Item from '../../../components/Item';

export default function Edit(props) {
  if (props.location.state.type === 'collection') {
    return (
      <Collection
        id={props.id}
        isNew={false}
        type={props.location.state.type}
      />
    );
  } else {
    return (
      <Item id={props.id} type={props.location.state.type} isNew={false} />
    );
  }
}
