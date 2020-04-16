export type ResponseState = {
  isFetching: number;
  error?: string;
  shapes?: string;
  audio?: HTMLAudioElement;
};

export type AppState = {
  response?: ResponseState;
};

export const initialState: AppState = {
  response: {
    isFetching: 0,
    error: null,
    mouthShapes: null,
    audio: null,
  },
};
