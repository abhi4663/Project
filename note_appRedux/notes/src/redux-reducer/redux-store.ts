import { compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import noteReducer from './reducer';

const initialState = {};

const reducers = combineReducers({
  note: noteReducer,
});

const store = createStore(
  reducers,
  initialState,
  compose(
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
