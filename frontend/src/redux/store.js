import { createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { reducer } from './reducers';

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) ||
  compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
