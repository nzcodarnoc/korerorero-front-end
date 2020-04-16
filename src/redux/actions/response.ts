import axios from "axios";
import { REQUEST } from "../../utils";

export const REQUEST_RESPONSE = "REQUEST_RESPONSE";
export const RECEIVE_RESPONSE = "RECEIVE_RESPONSE";
export const RECEIVE_RESPONSE_ERROR = "RECEIVE_RESPONSE_ERROR";

export const REQUEST_SHAPES = "REQUEST_SHAPES";
export const RECEIVE_SHAPES = "RECEIVE_SHAPES";
export const RECEIVE_SHAPES_ERROR = "RECEIVE_SHAPES_ERROR";

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
  audio: any;
  shapes: string;
}
// TODO: update "any" type
function receiveResponse(payload: any): ReceiveResponseAction {
  const blob = new Blob([payload.audio], { type: "audio/wav" });
  const audioUrl = URL.createObjectURL(blob);
  return {
    type: RECEIVE_RESPONSE,
    audio: audioUrl,
    shapes: payload.shapes,
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
    return axios({
      method: "get",
      url: REQUEST,
      responseType: "arraybuffer",
    })
      .then((response) => {
        dispatch(
          receiveResponse({
            shapes: response.headers.link,
            audio: response.data,
          })
        );
      })
      .catch((error) => dispatch(receiveResponseError(error.message)));
  };
}

export type ActionTypes =
  | RequestResponseAction
  | ReceiveResponseAction
  | ReceiveResponseErrorAction;
