import { applyMiddleware, createStore, combineReducers } from "redux";
import rootReducer from '../reducers';
import { createLogger }from "redux-logger";
import thunk from "redux-thunk";
import { promiseMiddleware, localStorageMiddleware } from '../middleware'
import { routerMiddleware } from 'react-router-redux'


import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

//If Redux Thunk middleware is enabled, any time you attempt to dispatch a function instead of an action object,
//the middleware will call that function with dispatch method itself as the first argument.

const middleware = applyMiddleware(myRouterMiddleware, thunk, promiseMiddleware, localStorageMiddleware, createLogger({collapsed: true}));
const store = createStore(rootReducer, middleware);

store.subscribe( () => {
});

export default store;

