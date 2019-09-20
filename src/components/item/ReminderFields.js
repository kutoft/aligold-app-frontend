import React from 'react';

export default function ReminderFields(props) {
  let { startDate, startTime, type } = props.fields;

  if(startDate === undefined) { startDate = ''; };
  if(startTime === undefined) { startTime = ''; };
  if(type === undefined) { type = ''; };

  return (
    <>
      <div className="date">
        <div>
          <input name="fields.date.startDate" value={startDate} onChange={(e) => props.handleFieldsChange(e)} />
        </div>
        <div>
          <input name="fields.date.startTime" value={startTime} onChange={(e) => props.handleFieldsChange(e)} />
        </div>
      </div>
      <div>
        <input name="fields.type" value={type} onChange={(e) => props.handleFieldsChange(e)} />
      </div>
    </>
  )
}
