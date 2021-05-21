import api from './api';

const getProjects = () => {
  return new Promise((resolve, reject) => {
    api.get('/projects').then(response => {
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

const createProject = (data) => {
  return new Promise((resolve, reject) => {
    api.post('/projects', data).then(response => {
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

const updateProject = (id, data) => {
  return new Promise((resolve, reject) => {
    api.put(`/projects/${id}`, data).then(response => {
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

const deleteProject = (id, data) => {
  return new Promise((resolve, reject) => {
    api.delete(`/projects/${id}`).then(response => {
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

export { getProjects, createProject, updateProject, deleteProject };