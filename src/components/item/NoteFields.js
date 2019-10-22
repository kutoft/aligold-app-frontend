import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    margin: '30px 10px 15px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
  },
  quill: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& .ql-container': {
      flexGrow: '1',
      border: 'none !important',
    },
    '& .ql-editor': {
      minHeight: '200px',
    },
    '& .ql-toolbar': {
      border: 'none !important',
      borderBottom: '1px solid rgba(0, 0, 0, 0.23) !important',
    }
  }
});

export default function NoteFields(props) {
  const classes = useStyles();

  if(props.fields.body === undefined) {
    props.fields.body = 'test';
  }

  return (
    <div className={classes.root}>
      <ReactQuill
        className={classes.quill}
        value={props.fields.body}
        onChange={(value) => props.handleEditorChange(value)}
      />
    </div>
  );
}
