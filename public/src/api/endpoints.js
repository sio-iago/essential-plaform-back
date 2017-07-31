/**
 * Back End API calls.
 */
const store = require('../store/storeConfig').store;

const request = require('superagent');

const PERFORM_ASYNC_REQUEST = true;

const SERVER_BASE_URL = '';
const LOGIN_URL = SERVER_BASE_URL + '/api/users/login';
const REGISTER_URL = SERVER_BASE_URL + '/api/users/register';
const VALIDATE_USER_URL = SERVER_BASE_URL + '/api/users/validate/';

const CREATE_NEW_JOB_URL = SERVER_BASE_URL + '/api/jobs/new';
const LIST_ALL_JOBS = SERVER_BASE_URL + '/api/jobs';
const DOWNLOAD_JOB_RESULT = SERVER_BASE_URL + '/api/download/jobResults';

export const register = () => {
  const {
    username,
    email,
    password
  } = store.getState().userReducer;

  return new Promise((resolve, reject) => {
    request
      .post(REGISTER_URL)
      .set('Accept', 'application/json')
      .send({
        email: email,
        username: username,
        password: password
      })
      .end((err, result) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      })
  });
}


export const login = () => {
  const {
    username,
    password
  } = store.getState().userReducer;

  return new Promise((resolve, reject) => {
    request
      .post(LOGIN_URL)
      .set('Accept', 'application/json')
      .send({
        username: username,
        password: password
      })
      .end((err, result) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      })
  });
}

export const validateUser = () => {
  const {
    token,
    username
  } = store.getState().userReducer;

  return new Promise((resolve, reject) => {
    request
      .get(VALIDATE_USER_URL + token)
      .set('Accept', 'application/json')
      .end((err, result) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      })
  });
};

export const getJobs = () => {
  const token = store.getState().userReducer.token;
  return new Promise((resolve, reject) => {
    request
      .get(LIST_ALL_JOBS)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .end((err, result) => {
        if(err) {
          reject(err);
        }
        else {
          resolve(result);
        }
      })
  });
};

// URL To Download the data
export const downloadResultUrl = (jobId) => DOWNLOAD_JOB_RESULT + '/' + jobId;

/**
 * Sends form data 
 * @param {String} url 
 * @param {FormData} formData 
 */
export const uploadFastaFile = (formData) => {
  const token = store.getState().userReducer.token;
  
  const req = new XMLHttpRequest();
  
  req.onreadystatechange = () => (req.status === 200 ? console.log('WORKS!') : console.log('=/'));
  req.open('post', CREATE_NEW_JOB_URL , PERFORM_ASYNC_REQUEST);
  req.setRequestHeader('Authorization', token);
  req.send(formData);
};