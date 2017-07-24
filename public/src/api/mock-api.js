/**
 * Back End API calls.
 */
const store = require('../store/storeConfig').store;

const PERFORM_ASYNC_REQUEST = true;

const SERVER_BASE_URL = 'http://10.1.1.100:8080'
const UPLOAD_FASTA_URL = SERVER_BASE_URL + '/api/jobs/new';

const userMock = () => {
  const {
    username,
    email,
    password
  } = store.getState().userReducer;

  return {
    username: username,
    email: email,
    token: 'DUMMY-TOKEN',
  }
}

export const register = () => {
  const {
    username,
    email,
    password
  } = store.getState().userReducer;

  return (!username || username.length < 4 || username !== password) ?
    {
      error: 'error'
    } :
    userMock();
}


export const login = () => {
  const {
    username,
    email,
    password
  } = store.getState().userReducer;

  return (!username || username.length < 4 || username !== password) ?
    {
      error: 'error'
    } :
    userMock();
}

export const validateUser = () => userMock();

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
  const req = new XMLHttpRequest();
  console.log(formData);

  req.onreadystatechange = () => (req.status === 200 ? console.log('WORKS!') : console.log('=/'));
  req.open('post', UPLOAD_FASTA_URL , PERFORM_ASYNC_REQUEST);
  // req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  req.send(formData);
};