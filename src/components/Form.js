// Main Contact Form

import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { browserHistory } from 'react-router'


// Define Contact Form Fields
export const fields = [ 'id', 'name', 'email', 'phone' ]

// Contact Form Validation
const validate = values => {
    // IMPORTANT: values is an Immutable.Map here!
    const errors = {}

    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length > 15) {
        errors.name = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.phone) {
        errors.phone = 'Required'
    } else if (values.phone.length > 20) {
        errors.phone = 'Must be 20 characters or less'
    }
    return errors
}

// Form Field Rendering
const renderField = ({ input, label, type, meta: { touched, error } }) => {
    if (type !== 'hidden') {
        return (
            <div>
                <label>{label}</label>
                <div>
                    <input {...input} type={type} placeholder={label}/>
      {touched && error && <span>{error}</span>}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <input {...input} type={type} />
            </div>
        )
    }
}


class AddContact extends React.Component {

    static propTypes = {
        initialValues: PropTypes.object,
        addContact: PropTypes.func.isRequired,
        editContact: PropTypes.func.isRequired,
        contacts: PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            is_edit: (typeof(this.props.params.id) !== "undefined"),
            title: (typeof(this.props.params.id) !== "undefined") ? "Edit" : "Add New"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log("ID", this.props.params.id);
    }


    // Edit mode Initialize values here
    componentDidMount() {
        const { initialize, initialValues } = this.props;

        if (this.state.is_edit) {
            console.log("initialValues", initialValues.toJS());
            initialize(initialValues.toJS());
        }
    }

    // Must pass to onSubmit for redux-form
    handleSubmit(values, props) {
        const { addContact, editContact } = props;

        if (this.state.is_edit) {
            console.log("Edit Contact Form Submit. Values:", values);
            editContact(this.props.params.id, values.name, values.email, values.phone);
        } else {
            console.log("Add New Contact Form Submit. Values:", values);
            addContact(values.name, values.email, values.phone);
        }

        browserHistory.push('/');
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props
        return (
            <div>
                <h1>{this.state.title} Contact:</h1>

                <form onSubmit={ handleSubmit((values)=>{this.handleSubmit(values, this.props);}) }>
                    <Field name="id" type="hidden" component={renderField} label=""/>
                    <Field name="name" type="text" component={renderField} label="Name"/>
                    <Field name="email" type="email" component={renderField} label="Email"/>
                    <Field name="phone" type="tel" component={renderField} label="Phone"/>
                    <div>
                        <button type="submit" disabled={submitting}>Submit</button>
                        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                    </div>
                </form>

            </div>
        )
    }
};

// Decorate with ReduxForm
AddContact = reduxForm({
    form: 'contact_form',  // a unique identifier for this form
    fields,
    validate
})(AddContact)

export default AddContact
