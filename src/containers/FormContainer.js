// Container for Add / Edit contact form

import { connect } from 'react-redux';
import AddContact from '../components/Form';
import { addContact, editContact } from '../actions'


function getSingleContact(contacts, id) {
    return contacts.get(contacts.findIndex(function(c) {
        return c.get("id") === id;
    }))
}

let stateValues;

const mapStateToProps = (state, ownProps) => {
    // Get the initialValues you want to set
    stateValues = getSingleContact(state.contacts.contacts, ownProps.id);

    return {
        contacts: state.contacts.contacts,
        initialValues: stateValues
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        //initializeForm: () => {
        //    dispatch(initialize('contact_form', stateValues));
        //},
        editContact: (id,name,email,phone) => {
            dispatch(editContact(id,name,email,phone))
        },
        addContact: (name,email,phone) => {
            dispatch(addContact(name,email,phone))
        }
    }
}

const FormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddContact)

export default FormContainer;
