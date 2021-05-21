import axios from "axios";
import config from './config';

const api = axios.create();

const getCookie = (cookiename) => {
  var cookiestring = RegExp(cookiename + "=[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
};

api.interceptors.request.use(
  request => {
    let baseURL = config.API_BASE_URL || '';
    request.url = baseURL + request.url;
    
    let userInfo = getCookie('userInfo');
    if (userInfo) {
      let token = JSON.parse(userInfo).token;
      request.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': '*/*'
      };
    }

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;