import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
export const ORCHESTRATION_ENDPOINT = publicRuntimeConfig.ORCHESTRATION_ENDPOINT;
export const RECOGNIZER_HOST = publicRuntimeConfig.RECOGNIZER_HOST;
export const RECOGNIZER_PATH = publicRuntimeConfig.RECOGNIZER_PATH;
export const STATIC_PATH = publicRuntimeConfig.SELF_PATH;
export const MOUTH_SHAPES_PATH = STATIC_PATH + "mouth-shapes/grace";
