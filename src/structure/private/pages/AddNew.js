import React from 'react';
import Collection from '../../../components/Collection';
import Item from '../../../components/Item';

export default function AddNew(props) {
  if (props.location.state.type === 'collection') {
    return <Collection isNew={true} type={props.location.state.type} />;
  } else {
    return <Item type={props.location.state.type} isNew={true} />;
  }
}
