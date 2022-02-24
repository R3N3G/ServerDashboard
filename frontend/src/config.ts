export const API_ENDPOINT_URL = process.env.NODE_ENV === "development" ? "http://localhost:4000" : window.origin;
export const WEBSOCKET_ENDPOINT_URL = API_ENDPOINT_URL.replace('http', 'ws') + '/system/ws';
export const STATIC_ENDPOINT_URL = API_ENDPOINT_URL + '/system/static';
