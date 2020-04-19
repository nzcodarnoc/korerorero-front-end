import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const ENDPOINT = publicRuntimeConfig.ORCHESTRATION_ENDPOINT;
