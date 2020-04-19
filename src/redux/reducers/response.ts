import { initialState } from "./state";
import {
  REQUEST_AUDIO,
  RECEIVE_AUDIO,
  REQUEST_SHAPES,
  RECEIVE_SHAPES,
  RECEIVE_ERROR,
  ActionTypes,
} from "../actions/response";

export default (state = initialState.response, action: ActionTypes) => {
  switch (action.type) {
    case REQUEST_AUDIO:
      return {
        ...state,
        isFetching: state.isFetching + 1,
      };
    case RECEIVE_AUDIO:
      return {
        ...state,
        audio: action.audio,
        isFetching: state.isFetching - 1,
      };
    case RECEIVE_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: state.isFetching - 1,
      };
      case REQUEST_SHAPES:
        return {
          ...state,
          isFetching: state.isFetching + 1,
        };
      case RECEIVE_SHAPES:
        return {
          ...state,
          mouthCues: action.mouthCues,
          isFetching: state.isFetching - 1,
        };
    default:
      return state;
  }
};
