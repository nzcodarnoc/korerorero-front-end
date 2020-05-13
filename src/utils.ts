// see also next.config.js where process.env is set using webpack
import envalid, { str, url } from "envalid";

const env = envalid.cleanEnv(process.env, {
  SELF_PATH: str(),
  ORCHESTRATION_ENDPOINT: url(),
  RECOGNIZER_HOST: url(),
  RECOGNIZER_PATH: str(),
});

export const ORCHESTRATION_ENDPOINT = env.ORCHESTRATION_ENDPOINT;
export const RECOGNIZER_HOST = env.RECOGNIZER_HOST;
export const RECOGNIZER_PATH = env.RECOGNIZER_PATH;
export const STATIC_PATH = env.SELF_PATH;
export const MOUTH_SHAPES_PATH = STATIC_PATH + "mouth-shapes";
