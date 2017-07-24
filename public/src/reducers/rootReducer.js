import { combineReducers } from 'redux';

import userReducer from './userReducer';
import jobsReducer from './jobsReducer';


const rootReducer = combineReducers({
  userReducer,
  jobsReducer,
});

export default rootReducer;
