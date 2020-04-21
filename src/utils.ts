import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const ENDPOINT = publicRuntimeConfig.ORCHESTRATION_ENDPOINT;
export const MOUTH_SHAPES_PATH = `${publicRuntimeConfig.staticFolder}/mouth-shapes`;
