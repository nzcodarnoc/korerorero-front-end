import { initialState } from "./state";
import {
  STARTED_SPEAKING,
  ENDED_SPEAKING,
  STARTED_THINKING,
  ENDED_THINKING,
  ActionTypes,
} from "../actions/speech";

export default (state = initialState.response, action: ActionTypes) => {
  switch (action.type) {
    case STARTED_SPEAKING:
      return {
        ...state,
        isSpeaking: true,
        isListening: false,
      };
    case ENDED_SPEAKING:
      return {
        ...state,
        isSpeaking: false,
        isListening: true,
      };
    case STARTED_THINKING:
      return {
        ...state,
        isThinking: true,
        isListening: false,
      };
    case ENDED_THINKING:
      return {
        ...state,
        isThinking: false,
      };
    default:
      return state;
  }
};
