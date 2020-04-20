import axios from "axios";
import { REQUEST, ENDPOINT } from "../../utils";

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
  audio: string;
}
interface ResponsePayload {
  audio: BlobPart;
}
function receiveResponse(payload: ResponsePayload): ReceiveResponseAction {
  const blob = new Blob([payload.audio], { type: "audio/wav" });
  const audioUrl = URL.createObjectURL(blob);
  return {
    type: RECEIVE_RESPONSE,
    audio: audioUrl,
  };
}

interface ReceiveResponseErrorAction {
  type: typeof RECEIVE_RESPONSE_ERROR;
  error: string;
}
function receiveResponseError(error: string): ReceiveResponseErrorAction {
  return {
    type: RECEIVE_RESPONSE_ERROR,
    error: error,
  };
}

// ANCHOR Shapes

function getShapes(path: string): Function {
  return (dispatch: Function) => {
    dispatch(requestShapes());
    return axios({
      method: "get",
      url: ENDPOINT + path,
      responseType: "json",
    })
      .then((response) => {
        dispatch(
          receiveShapes({
            shapes: response.data,
          })
        );
      })
      .catch((error) => dispatch(receiveShapesError(error.message)));
  };
}

interface RequestShapesAction {
  type: typeof REQUEST_SHAPES;
}
function requestShapes(): RequestShapesAction {
  return {
    type: REQUEST_SHAPES,
  };
}

interface ReceiveShapesAction {
  type: typeof RECEIVE_SHAPES;
  shapes: JSON;
}
interface ShapesPayload {
  shapes: JSON;
}
function receiveShapes(payload: ShapesPayload): ReceiveShapesAction {
  return {
    type: RECEIVE_SHAPES,
    shapes: payload.shapes,
  };
}

interface ReceiveShapesErrorAction {
  type: typeof RECEIVE_SHAPES_ERROR;
  error: string;
}
function receiveShapesError(error: string): ReceiveShapesErrorAction {
  return {
    type: RECEIVE_SHAPES_ERROR,
    error: error,
  };
}

// ANCHOR First Response, called when app initializes
export function firstResponse(): Function {
  return (dispatch: Function) => {
    dispatch(requestResponse());
    return axios({
      method: "get",
      url: REQUEST,
      responseType: "arraybuffer",
    })
      .then((response) => {
        dispatch(getShapes(response.headers.link)),
          dispatch(
            receiveResponse({
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
  | ReceiveResponseErrorAction
  | RequestShapesAction
  | ReceiveShapesAction
  | ReceiveShapesErrorAction;
