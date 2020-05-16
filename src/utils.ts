// see also next.config.js where process.env is set using webpack
import envalid, { str, url } from "envalid";

// See: https://nextjs.org/docs/basic-features/environment-variables
// Trying to destructure process.env variables won't work due to the
// limitations of webpack's DefinePlugin.
const env = envalid.cleanEnv(
  {
    NEXT_PUBLIC_SELF_PATH: process.env.NEXT_PUBLIC_SELF_PATH,
    NEXT_PUBLIC_ORCHESTRATION_ENDPOINT:
      process.env.NEXT_PUBLIC_ORCHESTRATION_ENDPOINT,
    NEXT_PUBLIC_RECOGNIZER_HOST: process.env.NEXT_PUBLIC_RECOGNIZER_HOST,
    NEXT_PUBLIC_RECOGNIZER_PATH: process.env.NEXT_PUBLIC_RECOGNIZER_PATH,
  },
  {
    NEXT_PUBLIC_SELF_PATH: str(),
    NEXT_PUBLIC_ORCHESTRATION_ENDPOINT: url(),
    NEXT_PUBLIC_RECOGNIZER_HOST: url(),
    NEXT_PUBLIC_RECOGNIZER_PATH: str(),
  }
);

export const ORCHESTRATION_ENDPOINT = env.NEXT_PUBLIC_ORCHESTRATION_ENDPOINT;
export const RECOGNIZER_HOST = env.NEXT_PUBLIC_RECOGNIZER_HOST;
export const RECOGNIZER_PATH = env.NEXT_PUBLIC_RECOGNIZER_PATH;
export const STATIC_PATH = env.NEXT_PUBLIC_SELF_PATH;
export const MOUTH_SHAPES_PATH = STATIC_PATH + "mouth-shapes";
