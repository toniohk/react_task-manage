import api from './api';

const getUsers = () => {
  return new Promise((resolve, reject) => {
    api.get('/users').then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/users', data).then(response => {
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

const updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    api.put(`/users/${id}`, data).then(response => {
      if (response.status === 204) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

const deleteUser = (id, data) => {
  return new Promise((resolve, reject) => {
    api.delete(`/users/${id}`).then(response => {
      if (response.status === 204) {
        resolve(response.data);
      } else {
        reject(response);
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

export { getUsers, createUser, updateUser, deleteUser };