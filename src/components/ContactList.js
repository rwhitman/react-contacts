// Contact List - Used as Home Screen

import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

export class Contact extends Component {

    static propTypes = {
        onSelect: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    }

    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSelect(id) {
        this.props.onSelect(id);
    }

    handleDelete(id) {
        this.props.onDelete(id);
    }

    render() {
        const { contact } = this.props;
        return (
            <div className="contact">
                <h3>{contact.name}</h3>
                <p>{contact.email} &nbsp; {contact.phone} </p>
                <p>
                    <Link to={`/contact/edit/${contact.id}`}>Edit</Link>  &nbsp; | &nbsp;
                    <a href="#" onClick={() => this.handleDelete(contact.id)} >Delete</a>
                </p>
                <p><em>[ Meta ID={contact.id} <a href="#" onClick={() => this.handleSelect(contact.id)} >Select</a> ]</em></p>
            </div>
        );
    }
};


// Contact List Component
class ContactList extends React.Component {

    // Defines required props
    static propTypes = {
        addNewContact: PropTypes.func.isRequired,
        deleteContact: PropTypes.func.isRequired,
        editContact: PropTypes.func.isRequired,
        contacts: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            activeContact: ''
        };

        this.addDummyContact = this.addDummyContact.bind(this);
        this.updateActive = this.updateActive.bind(this);
        this.removeContact = this.removeContact.bind(this);
        this.fakeEdit = this.fakeEdit.bind(this);
    }

    updateActive(id) {
        const { contacts } = this.props;

        var contact = contacts.get(contacts.findIndex(function(c) {
            return c.get("id") === id;
        }));

        this.setState({activeContact: contact.toJS()});
        console.log("Update Active: ", contact.toJS());
    }

    removeContact(id) {
        const { deleteContact } = this.props;
        console.log("Delete Contact Click: " + id);
        deleteContact(id);
    }

    fakeEdit(id) {
        const { editContact } = this.props;
        console.log("Fake Edit Contact Click: " + id);
        editContact(id, "Fake", "faked@foo.com", 9999999999);
    }


    addDummyContact(e) {
        e.preventDefault();
        const { addNewContact } = this.props;
        const names = ["Bob","Mary","Linda","Roger","Stacy","Todd","Jim"]
        var name = names[Math.floor(Math.random()*names.length)]
        console.log("Add Contact Click");

        addNewContact(name, name + "@foo.com", Math.floor(Math.random() * 1000000000));
    }

    render() {
        const { contacts } = this.props;

        return (
            <div>
                <h1>Contact List</h1>
                <div className='contact'>

                    <ul className='contact__list'>
                    {contacts.map(c => (
                        <li key={c.get('id')} className='contact__item' >
                            <Contact contact={c.toJS()} onDelete={this.removeContact} onSelect={this.updateActive} onEdit={this.fakeEdit} />
                        </li>
                    ))}
                    </ul>
                </div>


                <div className="active-contact" style={{color : '#637c84'}}>
                    <br /><br /><br /><br />
                    <hr /><hr />
                    <h2>Sandbox</h2>

                    <button onClick={this.addDummyContact}>Add Dummy Contact</button>
                    <br />

                    <h4>Active Contact: <em>{this.state.activeContact.id}</em></h4>
                    <p>
                        Name: {this.state.activeContact.name}
                        <br />Email: {this.state.activeContact.email}
                        <br />Phone: {this.state.activeContact.phone}
                    </p>
                    <p> <a href="#" onClick={() => this.fakeEdit(this.state.activeContact.id)} >Fake Edit</a></p>
                    <hr />
                </div>
            </div>
      )
    }
}


export default ContactList
