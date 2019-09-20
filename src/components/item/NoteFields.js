import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  quill: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    '& .ql-container': {
      flexGrow: '1',
    }
  }
});

export default function NoteFields(props) {
  const classes = useStyles();

  if(props.fields.body === undefined) {
    props.fields.body = 'test';
  }

  console.log(props.fields.body);

  // useEffect(() => {
  //   let initialState;
  //   console.log(body);
  //   //let content = convertFromRaw(body);
  //   //initialState = EditorState.createWithContent(content);
  //   //setEditorState(initialState);
  // }, [body]);

  // useEffect(() => {
  //   handleBody();
  // }, [editorState]);

  return (
    <ReactQuill
      className={classes.quill}
      value={props.fields.body}
      onChange={(value) => props.handleEditorChange(value)}
    />
  );
}
