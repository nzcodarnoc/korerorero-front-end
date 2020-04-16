export type ResponseState = {
  isFetching: number;
  error?: string;
  shapes?: JSON;
  audio?: string;
};

export type AppState = {
  response?: ResponseState;
};

export const initialState: AppState = {
  response: {
    isFetching: 0,
    error: null,
    shapes: null,
    audio: null,
  },
};
