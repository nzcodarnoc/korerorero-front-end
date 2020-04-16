import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const OK = `${publicRuntimeConfig.ORCHESTRATION_ENDPOINT}/`;
export const REQUEST = `${publicRuntimeConfig.ORCHESTRATION_ENDPOINT}/request`;
