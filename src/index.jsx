import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer }from 'react-hot-loader';
import {Provider } from 'react-redux';
import store from './store/store';
import Routes from './routes';
//import { promiseMiddleware } from './middleware';
import 'styles/reset.css';
import 'styles/styles.css';

ReactDOM.render(
   <Provider store={store}>
    <AppContainer >
      <Routes />
    </AppContainer>
  </Provider>,
    document.getElementById('main')
);

