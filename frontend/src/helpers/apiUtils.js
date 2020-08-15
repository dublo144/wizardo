import { backendUrl } from '../config/settings';

const handleHttpErrors = (res) => {
  console.log(res);
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
};

const makeOpts = (body, token = true) => {
  const opts = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  };
  if (token) {
    opts.headers['x-access-token'] = localStorage.getItem('jwtToken');
  }
  return opts;
};

const fetchData = async (opts) => {
  return fetch(`${backendUrl}`, opts)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch(console.error);
};

export const apiUtils = {
  fetchData: fetchData,
  makeOpts: makeOpts
};
