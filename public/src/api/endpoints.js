/**
 * Back End API calls.
 */
const store = require('../store/storeConfig').store;

const request = require('superagent');

const PERFORM_ASYNC_REQUEST = true;

const SERVER_BASE_URL = 'http://10.1.1.100:8080'
const LOGIN_URL = SERVER_BASE_URL + '/api/users/login';
const REGISTER_URL = SERVER_BASE_URL + '/api/users/register';
const VALIDATE_USER_URL = SERVER_BASE_URL + '/api/users/validate/';
const UPLOAD_FASTA_URL = SERVER_BASE_URL + '/api/jobs/new';


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

export const getJobs = () => [
  {
    id: '4562',
    label: 'Hypotesis 2',
    date: '24/07/2017',
    status: 'CREATED',
    result: '',
  },
  {
    id: '9854',
    date: '20/07/2017',
    label: 'Crazy Experiment 1',
    status: 'COMPLETED',
    result: 'http://www.google.com.br',
  },
  {
    id: '1147',
    label: 'Crazy Experiment 2',
    date: '23/07/2017',
    status: 'RUNNING',
    result: '',
  },
  {
    id: '5698',
    date: '15/07/2017',
    label: 'Hypotesis 1',
    status: 'COMPLETED',
    result: 'http://g1.globo.com',
  },
];

/**
 * Sends form data 
 * @param {String} url 
 * @param {FormData} formData 
 */
export const uploadFastaFile = (formData) => {
  const token = store.getState().userReducer.token;
  
  const req = new XMLHttpRequest();
  console.log(formData);

  req.onreadystatechange = () => (req.status === 200 ? console.log('WORKS!') : console.log('=/'));
  req.open('post', UPLOAD_FASTA_URL , PERFORM_ASYNC_REQUEST);
  req.setRequestHeader('Authorization', token);
  req.send(formData);
};