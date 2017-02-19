// Container for Contacts list view

import { connect } from 'react-redux'
import { addContact, deleteContact, editContact } from '../actions'
import ContactList from '../components/ContactList'

const mapStateToProps = (state) => ({
    contacts: state.contacts.contacts
})

const mapDispatchToProps = (dispatch) => {
    return {
        editContact: (id,name,email,phone) => {
            dispatch(editContact(id,name,email,phone))
        },
        addNewContact: (name,email,phone) => {
            dispatch(addContact(name,email,phone))
        },
        deleteContact: (id) => {
            dispatch(deleteContact(id))
        }
    }
}

const ListContactsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactList)

export default ListContactsContainer

