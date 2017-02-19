// Redux Store. Import reducers and initialize store.
// Also adds Redux data logging

import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import createLogger from 'redux-logger';

// Take reducer combine with routing so we can carry the store across pages
import contactReducer from './reducer'
const rootReducers = combineReducers({
    contacts: contactReducer,
    form,
    routing: routerReducer

})

const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    applyMiddleware(logger)
);

const store = createStore(rootReducers, enhancer)
const history = syncHistoryWithStore(browserHistory, store)


// Exports
export { logger, store, history };


