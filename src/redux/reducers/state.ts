export interface AppState {
  response?: ResponseState;
};

export interface MouthCues {
  start: number;
  end: number;
  value: string;
}

export interface ResponseState {
  isFetching: number;
  error?: string;
  mouthCues?: Array<MouthCues>;
  audio?: string;
};

export const initialState: AppState = {
  response: {
    isFetching: 0,
    error: null,
    mouthCues: null,
    audio: null,
  },
};
