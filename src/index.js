// Index file. Maps application data and component routes using Redux and Router.

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import AppBase from './components/AppBase'                              // Base template
import ListContactsContainer from './containers/ListContactsContainer'  // List of contacts for home screen
import FormContainer from './containers/FormContainer'                  // Add a new contact
import NotFound from './components/NotFound'                            // 404

import { store, history } from './store' // Import Redux store, history from react-router

// Uses react-redux "Provider" and react-router "Router" wrappers
render(
  <Provider store={store}>
      <Router history={history}>
        <Route path="/(:filter)" component={AppBase}>
          <IndexRoute component={ListContactsContainer} />
          <Route path="/contact/new" component={FormContainer} />
          <Route path="/contact/edit/:id" component={FormContainer} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root')
)
