collections: [{
  _id: ,
  title: ,
  primaryContact: {
    _id: ,
    fields: {
      avatar: ,
      firstName: ,
      lastName: ,
      occupation: ,
    }
  },
  meta: {
    createdBy: ,
    createdDate: ,
    updatedDate: ,
    updatedBy: ,
    collaborators: [{
      _id: ,
      type: ,
    }],
  },
}],
items: [{
  _id: ,
  collectionId: ,
  isPinned: , // bool
  title: , // fullName if contact
  type: , // appointment, note, reminder, todo, contact
  fields: {}, // differ based on type. see below
  linked: [{
    _id: , // a differnt item id
  }],
  labels: [{
    _id: , // label id
  }],
  meta: {
    createdBy: ,
    createdDate: ,
    updatedDate: ,
    updatedBy: ,
    collaborators: [{
      _id: ,
      type: ,
    }],
  },
}],

APPOINTMENTS: fields: {
  date: {
    startDate: ,
    startTime: ,
    endDate: ,
    endTime: ,
  },
  location: ,
  repeat: {
    amount: ,
    type: ,
    startOnDays: ,
    endType: ,
    endDate: ,
  },
},

NOTES: fields: {
  body: , // assuming rich text editor
},

TODO: fields: {
  todos: [{
    todo: ,
    isChecked: ,
  }],
  moveCheckedToBottom: ,
  hideChecked: ,
},

REMINDERS: fields {
  date: {
    startDate: ,
    startTime: ,
  },
  type: ,
},

CONTACT: fields: {
  isPrimary: ,
  avatar: ,
  firstName: ,
  middleName: ,
  lastName: ,
  occupation: , // list of common jobs
  salutation: , // list of personal and profesional titles (title is being used at generic level)
  emails: [{ // array of emails
    isPrimary: ,
    type: , // work, home, other
    email: ,
  }],
  phones: [{ // array of numbers
    isPrimary: ,
    type: , // work, home, other
    number: ,
  }],
  addresses: [{ // array of addresses
    isPrimary: ,
    type: , // work, home, other
    line1: ,
    line2: ,
    city: ,
    state: ,
    zip: ,
    country: ,
  }]
},
