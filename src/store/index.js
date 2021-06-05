import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import rootReducer from "./reducers";
import ReduxThunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =
  process.env.NODE_ENV === "development"
    ? createStore(rootReducer, composeEnhancers(applyMiddleware(logger,ReduxThunk)))
    : createStore(rootReducer);

export default store;