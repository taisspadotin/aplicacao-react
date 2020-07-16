import { clickReducer } from './clickReducer';
import { mostraTable } from './clickTable';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  clickState: clickReducer,
  TableState: mostraTable
  
});