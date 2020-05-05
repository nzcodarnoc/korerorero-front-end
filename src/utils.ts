import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const ENDPOINT = publicRuntimeConfig.ORCHESTRATION_ENDPOINT;
export const RECOGNIZER_HOST = publicRuntimeConfig.RECOGNIZER_HOST;
export const RECOGNIZER_PATH = publicRuntimeConfig.RECOGNIZER_PATH;
export const STATIC_PATH = publicRuntimeConfig.staticFolder;
export const MOUTH_SHAPES_PATH = `${STATIC_PATH}/mouth-shapes`;
