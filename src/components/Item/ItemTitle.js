import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.common.white,
    margin: '1rem 10px 0',
    textTransform: 'capitalize',
  },
  titleInput: {
    margin: '7px 10px 1rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: theme.palette.common.white,
    backgroundColor: 'transparent',
    padding: '10px 15px',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '50px',
  },
}));

export default function ItemTitle(props) {
  const classes = useStyles(props);
  const { item, itemType, handleChange } = props;

  return (
    <>
      <h6 className={classes.title}>
        {itemType} {itemType === 'contact' ? 'Name' : 'Title'}
      </h6>
      <input
        id="title"
        className={classes.titleInput}
        type="text"
        name="title"
        placeholder={
          itemType === 'contact' ? `${itemType} Nickname` : `${itemType} Title`
        }
        value={item.title}
        onChange={e => handleChange(e)}
      />
    </>
  );
}
