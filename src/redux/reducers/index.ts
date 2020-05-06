import response from "./response";
import speech from "./speech";
import { combineReducers } from "redux";

const root = combineReducers({
  response,
  speech,
});

export default root;
