import axios from "axios";
import { ENDPOINT } from "../../utils";
import { MouthCues } from "../reducers/state";
export const REQUEST_SHAPES = "REQUEST_SHAPES";
export const RECEIVE_SHAPES = "RECEIVE_SHAPES";
export const REQUEST_AUDIO = "REQUEST_AUDIO";
export const RECEIVE_AUDIO = "RECEIVE_AUDIO";
export const RECEIVE_ERROR = "RECEIVE_ERROR";

var orchestrationApi = axios.create({
  baseURL: ENDPOINT,
});
// ANCHOR interface ShapesPayload

interface ShapesPayload {
  data: {
    metadata: {
      soundFile: string;
      duration: number;
    };
    mouthCues: Array<MouthCues>;
  };
}

// ANCHOR: === SHAPES ===
// ANCHOR: RequestShapesAction
interface RequestShapesAction {
  type: typeof REQUEST_SHAPES;
}
function requestShapes(): RequestShapesAction {
  return {
    type: REQUEST_SHAPES,
  };
}

// ANCHOR: ReceiveShapesAction
interface ReceiveShapesAction {
  type: typeof RECEIVE_SHAPES;
  mouthCues: Array<MouthCues>;
}
function receiveShapes(payload: ShapesPayload): ReceiveShapesAction {
  return {
    type: RECEIVE_SHAPES,
    mouthCues: payload.data.mouthCues,
  };
}

// ANCHOR GetShapesAction
type GetShapesAction = Function
export function getShapes(message: string): GetShapesAction {
  return (dispatch: Function) => {
    dispatch(requestShapes());
    return orchestrationApi({
      method: "post",
      url: "/request",
      data: {
        message,
      },
      responseType: "json",
    })
      .then((response) => {
        dispatch(
          receiveShapes({
            data: response.data,
          })
        );
        dispatch(getAudio(response.data.metadata.soundFile))
      })
      .catch((error) => dispatch(receiveError(error.message)));
  };
}

// ANCHOR === AUDIO ===
// ANCHOR RequestAudioAction
interface RequestAudioAction {
  type: typeof REQUEST_AUDIO;
}
function requestAudio(): RequestAudioAction {
  return {
    type: REQUEST_AUDIO,
  };
}

// ANCHOR ReceiveAudioAction
interface ReceiveAudioAction {
  type: typeof RECEIVE_AUDIO;
  audio: string;
}
interface AudioPayload {
  audio: BlobPart;
}
function receiveAudio(payload: AudioPayload): ReceiveAudioAction {
  const blob = new Blob([payload.audio], { type: "audio/wav" });
  const audioUrl = URL.createObjectURL(blob);
  return {
    type: RECEIVE_AUDIO,
    audio: audioUrl,
  };
}

// ANCHOR GetAudioAction
type GetAudioAction = Function
function getAudio(url: string): GetAudioAction {
  return (dispatch: Function) => {
    dispatch(requestAudio());
    return orchestrationApi({
      method: "get",
      url,
      responseType: "arraybuffer",
    })
      .then((response) => {
        dispatch(
          receiveAudio({
            audio: response.data,
          })
        );
      })
      .catch((error) => dispatch(receiveError(error.message)));
  };
}

// ANCHOR === ERROR ===
// ANCHOR ReceiveErrorAction
interface ReceiveErrorAction {
  type: typeof RECEIVE_ERROR;
  error: string;
}
function receiveError(error: string): ReceiveErrorAction {
  return {
    type: RECEIVE_ERROR,
    error: error,
  };
}

export type ActionTypes =
  | RequestAudioAction
  | ReceiveAudioAction
  | RequestShapesAction
  | ReceiveShapesAction
  | ReceiveErrorAction;
