// Base template for the app. TODO: Refactor?

import React from 'react'
import { Link } from 'react-router';
import '../contacts.css';


const AppBase = React.createClass({
  render() {

    return (
        <div>
          <hr />
          <Link to="/">All Contacts</Link> &nbsp; | &nbsp; <Link to="/contact/new">Add New Contact</Link>
          <hr />
          <div className="row Content">
            <div className="col-xs-12">
                  {this.props.children}
            </div>
          </div>

        </div>
    )
  }
});

export default AppBase