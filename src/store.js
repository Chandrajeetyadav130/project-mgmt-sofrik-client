import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import { authReducer } from './reducers/authReducer';
import { projectReducer } from './reducers/projectReducer';

const rootReducer = combineReducers({ auth: authReducer, projects: projectReducer });
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
