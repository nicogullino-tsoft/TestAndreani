import React, {Commponent} from 'react';
// import {connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {history} from '/store/store';
import App from './app';
//import 'styles/index.scss';

const Routes = props => (
    <ConnectedRouter history={history}>
        <Switch>
        <Route path="/" component={App} />
        </Switch>
    </ConnectedRouter>
);

export default Routes;
