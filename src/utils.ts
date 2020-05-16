// see also next.config.js where process.env is set using webpack
import envalid, { str, url } from "envalid";

// See: https://nextjs.org/docs/basic-features/environment-variables
// Trying to destructure process.env variables won't work due to the 
// limitations of webpack's DefinePlugin.
const env = envalid.cleanEnv(
  {
    SELF_PATH: process.env.NEXT_PUBLIC_SELF_PATH,
    ORCHESTRATION_ENDPOINT: process.env.NEXT_PUBLIC_ORCHESTRATION_ENDPOINT,
    RECOGNIZER_HOST: process.env.NEXT_PUBLIC_RECOGNIZER_HOST,
    RECOGNIZER_PATH: process.env.NEXT_PUBLIC_RECOGNIZER_PATH,
  },
  {
    SELF_PATH: str(),
    ORCHESTRATION_ENDPOINT: url(),
    RECOGNIZER_HOST: url(),
    RECOGNIZER_PATH: str(),
  }
);

export const ORCHESTRATION_ENDPOINT = env.ORCHESTRATION_ENDPOINT;
export const RECOGNIZER_HOST = env.RECOGNIZER_HOST;
export const RECOGNIZER_PATH = env.RECOGNIZER_PATH;
export const STATIC_PATH = env.SELF_PATH;
export const MOUTH_SHAPES_PATH = STATIC_PATH + "mouth-shapes";
