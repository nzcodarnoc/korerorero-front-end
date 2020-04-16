import axios from "axios";
import { REQUEST } from "../../utils";

export const REQUEST_RESPONSE = "REQUEST_RESPONSE";
export const RECEIVE_RESPONSE = "RECEIVE_RESPONSE";
export const RECEIVE_RESPONSE_ERROR = "RECEIVE_RESPONSE_ERROR";

interface RequestResponseAction {
  type: typeof REQUEST_RESPONSE;
}
function requestResponse(): RequestResponseAction {
  return {
    type: REQUEST_RESPONSE,
  };
}

interface ReceiveResponseAction {
  type: typeof RECEIVE_RESPONSE;
  data: any;
}
// TODO: update "any" type
function receiveResponse(data: any): ReceiveResponseAction {
  return {
    type: RECEIVE_RESPONSE,
    data: data,
  };
}

interface ReceiveResponseErrorAction {
  type: typeof RECEIVE_RESPONSE_ERROR;
  error: string;
}
// TODO: update "any" type
function receiveResponseError(error: string): ReceiveResponseErrorAction {
  return {
    type: RECEIVE_RESPONSE_ERROR,
    error: error,
  };
}

export function firstResponse(): Function {
  return (dispatch: Function) => {
    dispatch(requestResponse());
    return axios
      .get(REQUEST)
      .then((response) => dispatch(receiveResponse(response)))
      .catch((error) => dispatch(receiveResponseError(error.message)));
  };
}

export type ActionTypes =
  | RequestResponseAction
  | ReceiveResponseAction
  | ReceiveResponseErrorAction;
