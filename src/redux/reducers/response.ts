import { initialState } from "./state";
import {
  REQUEST_RESPONSE,
  RECEIVE_RESPONSE,
  RECEIVE_RESPONSE_ERROR,
  ActionTypes,
} from "../actions/response";

export default (state = initialState.response, action: ActionTypes) => {
  switch (action.type) {
    case REQUEST_RESPONSE:
      return {
        ...state,
        isFetching: state.isFetching + 1,
      };
    case RECEIVE_RESPONSE:
      return {
        ...state,
        audio: action.audio,
        shapes: action.shapes,
        isFetching: state.isFetching - 1,
      };
    case RECEIVE_RESPONSE_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: state.isFetching - 1,
      };
    default:
      return state;
  }
};
