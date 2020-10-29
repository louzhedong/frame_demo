import { reducer, initialState } from './reducer.mjs';

export const createStore = (reducer) => {
  let currentState = initialState;
  let observers = [];

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = reducer(currentState, action);
    observers.forEach(fn => fn());
  }

  function subscribe(fn) {
    observers.push(fn);
  }

  return { getState, dispatch, subscribe };
}

const store = createStore(reducer);
store.subscribe(() => { console.log('component 1') });
store.subscribe(() => { console.log('component 2') });
store.dispatch({ type: 'plus' });
store.dispatch({ type: 'plus' });
console.log(store.getState());