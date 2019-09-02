import { combineReducers } from 'redux';

import repository from './repositoryReducer';
import provider from './providersReducer';
import credential from './credentialReducer';
import project from './projectReducer';
import role from './roleReducer';
import user from './userReducer';


// import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    repository,
    provider,
    credential,
    project,
    role,
    user
});

export default rootReducer;
