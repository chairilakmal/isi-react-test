const baseURL = 'https://cms-admin-v2.ihsansolusi.co.id/testapi/';

export const withToken = ({ method = '', timeout = 15000, url, token, data, baseURL = baseURL, responseType = 'json' }) => ({
    baseURL,
    method,
    url,
    timeout,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data,
    responseType
})

export const withBasic = ({ method = '', timeout = 15000, url, data, baseURL = baseURL }) => ({
  baseURL,
  method,
  url,
  timeout,
  data
});