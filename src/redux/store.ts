import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import logger from "redux-logger";
import { initialState } from "./reducers/state";

const store = createStore(
  rootReducer,
  initialState as any,
  compose(applyMiddleware(thunk, logger))
);

export default store;
export const dispatch = store.dispatch;
