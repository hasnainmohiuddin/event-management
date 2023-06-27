import { getUser, logoutUser } from '../helpers/authHelpers';

export default function setupAxios(axios) {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

  axios.interceptors.request.use(
    (config) => {
      const user = getUser();

      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err),
  );

  axios.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response?.status === 401) {
        logoutUser();
      }

      return Promise.reject(err);
    },
  );
}
