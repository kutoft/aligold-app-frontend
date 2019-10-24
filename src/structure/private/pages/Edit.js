import React from 'react';
import Collection from '../../../components/Collection';
import Item from '../../../components/Item';

export default function Edit(props) {
  if (props.location.state.type === 'collection') {
    return <Collection id={props.id} isNew={false} />;
  } else {
    return (
      <Item id={props.id} itemType={props.location.state.type} isNew={false} />
    );
  }
}
