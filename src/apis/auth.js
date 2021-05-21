import api from './api';

const login = (authInfo) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/login', authInfo).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      reject(error);
    });
  });
};

const signup = (authInfo) => {
  return new Promise((resolve, reject) => {
    api.post('/auth/signup', authInfo).then(response => {
      if (response.status === 201) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      reject(error);
    });
  });
};

export { login, signup };