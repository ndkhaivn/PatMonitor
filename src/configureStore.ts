import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
import { ApplicationState, createRootReducer } from './store/index';

const initialState = {};
const middleware = [thunk];

// Setup Redux Dev Tool
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default function configureStore(initialState: ApplicationState): Store<ApplicationState> {

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  // Create the store
  const store = createStore(createRootReducer(), initialState, enhancer);

  return store
}