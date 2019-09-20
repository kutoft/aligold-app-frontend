import React, { useState } from 'react';

export default function NoteFields(props) {
  const {newTodo, setNewTodo} = useState('');
  let { todos, moveCheckedToBottom, hideChecked } = props.fields;

  if(todos === undefined) { todos = []; };
  if(moveCheckedToBottom === undefined) { moveCheckedToBottom = true; };
  if(hideChecked === undefined) { hideChecked = false; };

  return (
    <>
      <div className="todos">
        {todos.map((todo, index) => (
          <div className="todo" key={index} >
            <input name={`${index}.todo`} value={todo.todo} onChange={(e) => props.handleFieldsChange(e)} />
          </div>
        ))}
        <div className="todo" >
          <input name="newTodo" value={newTodo} onChange={(e) => props.handleFieldsChange(e)} />
        </div>
      </div>
    </>
  )
}
