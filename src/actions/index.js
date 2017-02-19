// Redux Actions

const uid = () => Math.random().toString(16).slice(2); // Build unique user ID

// Action: addContact. Adds a contact
export function addContact(name, email, phone) {
  console.log("addContact Action. name: " + name + " email: " + email);
  return {
    type: 'ADD_CONTACT',
    payload: {
      id: uid(),
      name: name,
      email: email,
      phone: phone
    }
  };
}

// Action: editContact. Edit a contact
export function editContact(id, name, email, phone) {
  console.log("editContact Action. id: " + id + " name: " + name + " email: " + email + " phone: " + phone);
  return {
    type: 'EDIT_CONTACT',
    payload: {
      id: id,
      name: name,
      email: email,
      phone: phone
    }
  };
}

// Action: deleteContact. Deletes a contact
export function deleteContact(id) {
  console.log("deleteContact Action. ID:" + id);
  return {
    type: 'DELETE_CONTACT',
    payload: id
  };
}

