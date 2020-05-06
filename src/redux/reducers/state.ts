export interface AppState {
  response?: ResponseState;
  speech?: SpeechState;
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

export interface SpeechState {
  isSpeaking: boolean,
  isListening: boolean,
  isThinking: boolean,
};

export const initialState: AppState = {
  response: {
    isFetching: 0,
    error: null,
    mouthCues: null,
    audio: null,
  },
  speech: {
    isSpeaking: false,
    isListening: false,
    isThinking: false,
  }
};
