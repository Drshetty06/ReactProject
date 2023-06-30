import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './Reducers/Users';
import authReducer from './Reducers/Auth';
import rolesReducer from './Reducers/Fetch';
import roleReducer from './Reducers/Role';

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
  roles: rolesReducer,
  role: roleReducer
});


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
