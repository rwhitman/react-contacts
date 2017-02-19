// Redux Reducers for Contacts
import { List, Map } from 'immutable';

const initialState = {
    contacts: List([])
};

// Contact Reducers
export default function reducer(state = initialState, action) {
    switch(action.type) {

        // Adds a Contact
        case 'ADD_CONTACT':
            console.log("Add Contact Reducer");
            return Object.assign({}, state, {
                contacts: state.contacts.push(Map(action.payload))
            });

        // Removes a Contact
        case 'DELETE_CONTACT':
            console.log("Delete Contact Reducer. ID: " + action.payload);
            const indexToDelete = state.contacts.findIndex(c => {
                return c.get('id') === action.payload
            })
            console.log("Index: ", indexToDelete)

            return Object.assign({}, state, {
                contacts: state.contacts.delete(indexToDelete)
            });

        // Updates a Contact
        case 'EDIT_CONTACT':
            console.log("Edit Contact Reducer. Payload: ", action.payload);
            const indexToEdit = state.contacts.findIndex(c => {
                return c.get('id') === action.payload.id
            })

            return Object.assign({}, state, {
                contacts: state.contacts.update(indexToEdit, function(c) {
                    return c.update(map => {
                        return Map(action.payload)
                    })
                })
            });

        default:
            return state;
    }
}

