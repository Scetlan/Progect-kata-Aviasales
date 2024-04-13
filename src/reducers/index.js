// import { combineReducers } from 'redux';

// const rootReducer = combineReducers({

// });

// export default rootReducer;

const incr = 0

const reducer = (state, action) => {
  if (action.type === 'INC') {
    return state + 1;
  }
  return 0;
}

let state = reducer(incr, { type: 'INC' });