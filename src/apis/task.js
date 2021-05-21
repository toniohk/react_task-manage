import api from './api';

const getTasks = () => {
  return new Promise((resolve, reject) => {
    api.get('/tasks').then(response => {
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

const createTask = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/tasks', data).then(response => {
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

const updateTask = (id, data) => {
  return new Promise((resolve, reject) => {
    api.put(`/tasks/${id}`, data).then(response => {
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

const deleteTask = (id, data) => {
  return new Promise((resolve, reject) => {
    api.delete(`/tasks/${id}`).then(response => {
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

export { getTasks, createTask, updateTask, deleteTask };