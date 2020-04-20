import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export const ENDPOINT = publicRuntimeConfig.ORCHESTRATION_ENDPOINT;
export const STATUS = `${ENDPOINT}/`;
export const REQUEST = `${ENDPOINT}/request`;